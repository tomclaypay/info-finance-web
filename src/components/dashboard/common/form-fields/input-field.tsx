import { SearchRefTypes } from '@app/pages/dashboard/complaints'
import { StandardTextFieldProps, TextField } from '@mui/material'
import { forwardRef, Ref, useImperativeHandle, useRef } from 'react'

export type InputFieldProps = StandardTextFieldProps

function InputField(props: InputFieldProps, ref: Ref<SearchRefTypes>) {
  const { name, value, label, disabled, onChange, ...inputProps } = props

  const searchRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    handleClearSearch: () => {
      searchRef.current.value = ''
    },
  }))

  return (
    <TextField
      fullWidth
      variant="outlined"
      name={name}
      value={value}
      label={label}
      disabled={disabled}
      inputRef={searchRef}
      onChange={onChange}
      {...inputProps}
    />
  )
}

export default forwardRef(InputField)
