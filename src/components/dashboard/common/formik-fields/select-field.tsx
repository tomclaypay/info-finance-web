import { Option } from '@app/interfaces/common'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { ErrorMessage, FieldProps } from 'formik'

export interface SelectFieldProps extends FieldProps {
  label: string
  disabled: boolean
  options: Option[]
}

export default function SelectField(props: SelectFieldProps) {
  const { field, form, label, disabled, options } = props
  const { name } = field

  const showError = Boolean(form.touched[name] && form.errors[name])

  return (
    <FormControl fullWidth error={showError} disabled={disabled}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select {...field} labelId={name} label={label}>
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={name} component={FormHelperText} />
    </FormControl>
  )
}
