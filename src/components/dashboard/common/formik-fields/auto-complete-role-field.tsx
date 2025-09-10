import { CsMember } from '@app/interfaces/cs-member'
import { FormControl, FormHelperText } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { ErrorMessage, FieldProps } from 'formik'
import { toast } from 'react-hot-toast'

export interface AutoCompleteFieldProps extends FieldProps {
  label: string
  disabled: boolean
  options: string[]
  leader?: CsMember
}

export default function AutoCompleteRoleField(props: AutoCompleteFieldProps) {
  const { field, form, label, options, disabled, leader } = props
  const { name, onChange } = field
  const { setFieldValue, values } = form

  const showError = Boolean(form.errors[name] && form.touched[name])

  return (
    <FormControl error={showError} fullWidth>
      <Autocomplete
        disabled={disabled}
        fullWidth
        {...field}
        onChange={(_, option: string) => {
          if (leader?.length > 0 && values.role === 'member' && option === 'leader') {
            toast.error('Team đã có leader, xin vui lòng gỡ leader cũ ra trước')
            // setFieldValue(name, 'member')
          } else {
            setFieldValue(name, option)
          }
        }}
        options={options || []}
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
