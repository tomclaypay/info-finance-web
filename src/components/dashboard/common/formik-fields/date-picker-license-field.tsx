import { FormControl, FormHelperText, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ErrorMessage, FieldProps } from 'formik'

export interface DatePickerFieldProps extends FieldProps {
  label: string
  disabled: boolean
}

export default function DatePickerLicenseField(props: DatePickerFieldProps) {
  const { field, form, disabled, label, ...inputProps } = props
  const { name } = field
  const { setFieldValue } = form

  const showError = Boolean(form.errors[name] && form.touched[name])

  const handleDateChange = (date: any) => {
    setFieldValue(name, date)
  }

  return (
    <FormControl error={showError} fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...field}
          label={label}
          inputFormat="DD/MM/YYYY"
          {...inputProps}
          disabled={disabled}
          onChange={handleDateChange}
          renderInput={(inputProps) => <TextField fullWidth {...inputProps} {...field} />}
        />
      </LocalizationProvider>
      <ErrorMessage name={name} component={FormHelperText} />
    </FormControl>
  )
}
