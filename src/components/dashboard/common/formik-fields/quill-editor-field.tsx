import { QuillEditor } from '@app/components/quill-editor'
import { FormControl, FormHelperText } from '@mui/material'
import { FieldProps, ErrorMessage } from 'formik'

export interface QuillEditorFieldProps extends FieldProps {
  label: string
  placeholder: string
  disabled: boolean
  type: string
}

export default function QuillEditorField(props: QuillEditorFieldProps) {
  const { field, form, disabled, type, placeholder, label, ...inputProps } = props
  const { name } = field
  const { setFieldValue } = form

  const showError = Boolean(form.errors[name] && form.touched[name])

  const handleOnBlur = () => {
    console.log('avoid error')
  }

  return (
    <FormControl error={showError} fullWidth>
      <QuillEditor
        {...field}
        fullWidth
        variant="outlined"
        label={label}
        placeholder={placeholder}
        type={type}
        readOnly={disabled}
        error={showError}
        {...inputProps}
        onBlur={handleOnBlur}
        onChange={(content: string) => {
          if (!disabled) {
            setFieldValue(name, content)
          }
        }}
      />
      <ErrorMessage name={name} component={FormHelperText} />
    </FormControl>
  )
}
