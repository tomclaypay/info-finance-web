import { Grid, Stack } from '@mui/material'
import { ChangeEvent } from 'react'
import InputField from '../../common/form-fields/input-field'

interface NationalsFilterProps {
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void
  onNameVnChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function NationalsFilter({ onNameChange, onNameVnChange }: NationalsFilterProps) {
  return (
    <Stack
      p={3}
      m={-1.5}
      sx={{
        flexWrap: 'wrap',
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <InputField fullWidth label="Tìm kiếm theo tên tiếng anh" onChange={onNameChange} />
        </Grid>
        <Grid item xs={3}>
          <InputField fullWidth label="Tìm kiếm theo tên tiếng việt" onChange={onNameVnChange} />
        </Grid>
      </Grid>
    </Stack>
  )
}
