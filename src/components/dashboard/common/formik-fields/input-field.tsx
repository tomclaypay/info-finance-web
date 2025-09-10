import { FormControl, FormHelperText, StandardTextFieldProps, TextField } from '@mui/material'
import { ErrorMessage, FieldProps } from 'formik'

export interface InputFieldProps extends FieldProps, StandardTextFieldProps {
  label: string
  placeholder: string
  disabled: boolean
  type: string
  multiline?: boolean
  rows?: number
}

export default function InputField(props: InputFieldProps) {
  const { field, form, label, placeholder, disabled, type, multiline, rows, ...inputProps } = props
  const { name } = field

  const showError = Boolean(form.errors[name] && form.touched[name])

  return (
    <>
      <FormControl error={showError} fullWidth>
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          error={showError}
          multiline={multiline}
          rows={rows}
          {...inputProps}
        />
        <ErrorMessage name={name} component={FormHelperText} />
      </FormControl>
    </>
  )
}
