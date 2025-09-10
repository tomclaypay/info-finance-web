import { Option } from '@app/interfaces/common'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ReactNode } from 'react'

export interface SelectFieldProps {
  name: string
  value?: string
  label?: string
  disabled?: boolean
  options?: Option[]
  all?: boolean
  english?: boolean
  onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

export default function SelectField(props: SelectFieldProps) {
  const { name, value, label, disabled, options, all = true, english, onChange } = props

  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select labelId={name} label={label} value={value} onChange={onChange}>
        {all && (
          <MenuItem value="">
            <em>Tất cả</em>
          </MenuItem>
        )}
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {english ? option.label_en : option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
