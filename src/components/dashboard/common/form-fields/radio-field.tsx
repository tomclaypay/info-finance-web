import { Option } from '@app/interfaces/common'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent } from 'react'

export interface RadioFieldProps {
  label?: string
  name: string
  defaultValue?: string
  disabled?: boolean
  options?: Option[]
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
}

export default function RadioField(props: RadioFieldProps) {
  const { label, options, disabled, defaultValue, onChange } = props

  return (
    <FormControl disabled={disabled} component="fieldset" fullWidth>
      <FormLabel sx={{ typography: 'caption' }} component="legend">
        {label}
      </FormLabel>
      <RadioGroup row defaultValue={defaultValue} onChange={onChange}>
        {options?.map((option) => (
          <FormControlLabel key={option.value} value={option.value} label={option.label} control={<Radio />} />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
