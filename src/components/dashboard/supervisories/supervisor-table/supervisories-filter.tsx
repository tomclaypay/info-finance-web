import { Grid, Stack } from '@mui/material'
import { ChangeEvent } from 'react'
import InputField from '../../common/form-fields/input-field'

interface SupervisoriesFilterProps {
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function SupervisoriesFilter({ onNameChange }: SupervisoriesFilterProps) {
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
          <InputField fullWidth label="Tìm kiếm theo tên" onChange={onNameChange} />
        </Grid>
      </Grid>
    </Stack>
  )
}
