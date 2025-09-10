import { CsMember } from '@app/interfaces/cs-member'
import { FormControl, FormHelperText } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { ErrorMessage, FieldProps } from 'formik'

export interface AutoCompleteTeamFieldProps extends FieldProps {
  label: string
  disabled: boolean
  options: { value: string; label: string }[]
  multiple?: boolean
}

export default function AutoCompleteTeamField(props: AutoCompleteTeamFieldProps) {
  const { field, form, label, options, disabled, multiple } = props
  const { name, onChange, value } = field
  const { setFieldValue } = form

  const showError = Boolean(form.errors[name] && form.touched[name])

  return (
    <FormControl error={showError} fullWidth>
      <Autocomplete
        disabled={disabled}
        multiple={multiple}
        fullWidth
        {...field}
        onChange={(_, option) => {
          if (multiple) {
            setFieldValue(name, [...value, option])
          } else setFieldValue(name, option)
        }}
        options={options || []}
        getOptionLabel={(option) => {
          return multiple ? option.label : option.label
        }}
        renderInput={(params) => (
          <>
            <TextField {...params} fullWidth label={label} onChange={onChange} />
            <ErrorMessage name={name} component={FormHelperText} />
          </>
        )}
      />
    </FormControl>
  )
}
