import { Box, Grid, Stack, TextField } from '@mui/material'
import { ChangeEvent } from 'react'

interface ExchangeFilterProps {
  onSearchChangeName: (event: ChangeEvent<HTMLInputElement>) => void
  onSearchChangeWebsite: (event: ChangeEvent<HTMLInputElement>) => void
  // initialCsTeamName?: any
}

export default function ExchangeFilter({ onSearchChangeName, onSearchChangeWebsite }: ExchangeFilterProps) {
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
          <TextField fullWidth label="Tìm kiếm theo tên" onChange={onSearchChangeName} />
        </Grid>

        <Grid item xs={3}>
          <TextField fullWidth label="Tìm kiếm theo website" onChange={onSearchChangeWebsite} />
        </Grid>
      </Grid>
    </Stack>
  )
}
