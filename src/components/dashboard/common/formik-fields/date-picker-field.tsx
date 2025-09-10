import { FormControl, FormHelperText, TextField } from '@mui/material'
import { FieldProps, ErrorMessage } from 'formik'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import PopupAlert from '../popup-alert'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export interface DatePickerFieldProps extends FieldProps {
  label: string
  placeholder: string
  disabled: boolean
  type: string
}

export default function DatePickerField(props: DatePickerFieldProps) {
  const { field, form, disabled, label, ...inputProps } = props
  const { name } = field
  const { setFieldValue, values } = form
  const [openPopup, setOpenPopup] = useState(false)
  const [alertPopup, setAlertPopup] = useState('')

  const showError = Boolean(form.errors[name] && form.touched[name])

  const handleStartDateChange = (date: any) => {
    if (date > new Date()) {
      setFieldValue('start', date)
    }
    // Prevent end date to be before start date
    // if (date < new Date()) {
    //   setOpenPopup(true)
    //   setAlertPopup('Vui lòng chọn thời gian trễ hơn hiện tại')
    //   setFieldValue('start', new Date())
    // }

    if (date < new Date()) {
      setFieldValue('start', date)
    }

    if (values?.end && date > new Date(values?.end)) {
      setOpenPopup(true)
      setAlertPopup('Vui lòng chọn thời gian bắt đầu sớm hơn thời gian kết thúc')
      setFieldValue('start', values.end)
    }
  }

  const handleEndDateChange = (date: any) => {
    if (date > new Date()) {
      setFieldValue('end', date)
    }

    // Prevent start date to be after end date
    // if (date < new Date()) {
    //   setOpenPopup(true)
    //   setAlertPopup('Vui lòng chọn thời gian trễ hơn hiện tại')
    //   setFieldValue('end', new Date())
    // }

    if (date < new Date()) {
      setFieldValue('end', date)
    }

    if (values.start && date < new Date(values.start)) {
      setOpenPopup(true)
      setAlertPopup('Vui lòng chọn thời gian kết thúc trễ hơn thời gian bắt đầu')
      setFieldValue('end', values.start)
    }
  }

  return (
    <FormControl error={showError} fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          {...field}
          label={label}
          ampmInClock={true}
          inputFormat="DD/MM/YYYY HH:mm"
          {...inputProps}
          disabled={disabled}
          onChange={name === 'start' ? handleStartDateChange : handleEndDateChange}
          renderInput={(inputProps) => <TextField fullWidth {...inputProps} {...field} />}
        />
      </LocalizationProvider>
      <ErrorMessage name={name} component={FormHelperText} />
      <PopupAlert
        open={openPopup}
        alert={alertPopup}
        handleClose={() => {
          setOpenPopup(false)
          setAlertPopup('')
        }}
      />
    </FormControl>
  )
}
