import { Option } from '@app/interfaces/common'
import { Autocomplete, Grid, Stack, TextField } from '@mui/material'
import { ChangeEvent } from 'react'

interface ExchangeFilterProps {
  onSearchChangeExchangeName: (event: any) => void
  onSearchChangeUserName: (event: any) => void
  onSearchChangeSeederName: (event: any) => void
  onSearchChangeComment: (event: ChangeEvent<HTMLInputElement>) => void
  onSearchChangePoint: (event: ChangeEvent<HTMLInputElement>) => void
  initialSearch?: any
  exchangeOptions?: Option[]
  userNameOptions?: Option[]
  seederNameOptions?: Option[]
}

export default function FeedbackFilter({
  onSearchChangeExchangeName,
  onSearchChangeUserName,
  onSearchChangeSeederName,
  onSearchChangeComment,
  onSearchChangePoint,
  initialSearch,
  exchangeOptions,
  userNameOptions,
  seederNameOptions,
}: ExchangeFilterProps) {
  return (
    <Stack
      p={3}
      m={-1.5}
      sx={{
        flexWrap: 'wrap',
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={2}>
          {exchangeOptions && (
            <Autocomplete
              id="tags-outlined"
              fullWidth
              options={exchangeOptions || []}
              getOptionLabel={(item: any) => item?.label || ''}
              filterSelectedOptions
              defaultValue={{
                value: initialSearch.exchangeId,
                label: initialSearch.exchangeName,
              }}
              renderInput={(params) => <TextField {...params} label="Tìm kiếm theo tên sàn" />}
              onChange={(event, newValue) => {
                onSearchChangeExchangeName(newValue)
              }}
            />
          )}
          {/* <TextField fullWidth label="Tìm kiếm theo tên sàn" onChange={onSearchChangeExchangeName} /> */}
        </Grid>

        <Grid item xs={2}>
          <TextField fullWidth label="Tìm kiếm theo nội dung" onChange={onSearchChangeComment} />
        </Grid>

        <Grid item xs={2}>
          {userNameOptions && (
            <Autocomplete
              id="tags-outlined"
              fullWidth
              options={userNameOptions || []}
              getOptionLabel={(item: any) => item?.label || ''}
              filterSelectedOptions
              defaultValue={{
                value: initialSearch.userId,
                label: initialSearch.displayName,
              }}
              renderInput={(params) => <TextField {...params} label="Tìm kiếm theo tên user" />}
              onChange={(event, newValue) => {
                onSearchChangeUserName(newValue)
              }}
            />
          )}
          {/* <TextField fullWidth label="Tìm kiếm theo tên user" onChange={onSearchChangeUserName} /> */}
        </Grid>
        <Grid item xs={2}>
          {seederNameOptions && (
            <Autocomplete
              id="tags-outlined"
              fullWidth
              options={seederNameOptions || []}
              getOptionLabel={(item: any) => item?.label || ''}
              filterSelectedOptions
              defaultValue={{
                value: initialSearch.userId,
                label: initialSearch.displayName,
              }}
              renderInput={(params) => <TextField {...params} label="Tìm kiếm theo tên seeder" />}
              onChange={(event, newValue) => {
                onSearchChangeSeederName(newValue)
              }}
            />
          )}
        </Grid>
        <Grid item xs={2}>
          <TextField fullWidth label="Tìm kiếm theo điểm" onChange={onSearchChangePoint} type="number" />
        </Grid>
      </Grid>
    </Stack>
  )
}
