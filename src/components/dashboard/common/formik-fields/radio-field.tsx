import { Option } from '@app/interfaces/common'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import { ErrorMessage, FieldProps } from 'formik'

export interface RadioFieldProps extends FieldProps {
  label: string
  disabled: boolean
  options: Option[]
}

export default function RadioField(props: RadioFieldProps) {
  const { field, form, label, options, disabled, ...radioProps } = props
  const { name } = field

  const showError = Boolean(form.errors[name] && form.touched[name])

  return (
    <FormControl disabled={disabled} component="fieldset" error={showError} fullWidth>
      <FormLabel sx={{ typography: 'caption' }} component="legend">
        {label}
      </FormLabel>
      <RadioGroup row {...field} {...radioProps}>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
      <ErrorMessage name={name} component={FormHelperText} />
    </FormControl>
  )
}
