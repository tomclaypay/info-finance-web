import { Grid, Stack, TextField } from '@mui/material'
import { ChangeEvent } from 'react'

interface CsTeamFilterProps {
  onSearchChangeName: (event: ChangeEvent<HTMLInputElement>) => void
  initialCsTeamName?: any
}

export default function CsTeamFilter({ onSearchChangeName, initialCsTeamName }: CsTeamFilterProps) {
  return (
    <Stack
      p={3}
      m={-1.5}
      sx={{
        flexWrap: 'wrap',
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Tìm kiếm theo tên"
            defaultValue={initialCsTeamName}
            onChange={onSearchChangeName}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}
