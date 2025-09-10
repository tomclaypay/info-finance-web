import { UserOption } from '@app/interfaces/common'
import { Complaint } from '@app/interfaces/complaint'
import { FormControl, FormHelperText } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { ErrorMessage, FieldProps, FormikProps } from 'formik'

export interface AutoCompleteFieldProps extends FieldProps {
  form: FormikProps<Complaint>
  label: string
  disabled: boolean
  options: UserOption[]
  onSelectOption?: (value: any, form: any) => void
}

export default function AutoCompleteField(props: AutoCompleteFieldProps) {
  const { field, form, label, options, disabled, onSelectOption } = props
  const { name, onChange } = field
  const { setFieldValue } = form

  const showError = Boolean(form.errors[name] && form.touched[name])

  return (
    <FormControl error={showError} fullWidth>
      <Autocomplete
        disabled={disabled}
        fullWidth
        {...field}
        onChange={(_, option: UserOption) => {
          setFieldValue(name, option?.label)
          onSelectOption?.(option, form)
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
