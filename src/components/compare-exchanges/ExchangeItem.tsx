import { Exchange } from '@app/interfaces/exchange'
import { getColorFromScore } from '@app/utils/exchange'
import { Autocomplete, CircularProgress, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ExchangeItemProp {
  exchangeData: Exchange[]
  selected: Exchange | null
  handleSelectExchange: (exchange: Exchange | null) => void
  isLoading: boolean
  exclude: string | null
  setLoading: (value: boolean) => void
  handleSearchExchange: (value: string) => void
}
const ExchangeItem = (props: ExchangeItemProp) => {
  const { exchangeData, selected, handleSelectExchange, exclude, handleSearchExchange, isLoading, setLoading } = props
  const [data, setData] = useState<Exchange[]>([])
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (exclude) {
      setData(exchangeData.filter((exchange) => exchange.id !== exclude))
    } else setData(exchangeData)
  }, [exchangeData, exclude])

  const handleOpen = () => {
    setOpen(true)
    setLoading(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: '10px',
        width: '100%',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: '10px',
          border: '1px solid #2a559c',
          borderRadius: '5px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            border: '1px solid #2a559c',
            borderRadius: '5px',
            marginRight: '10px',
          }}
        >
          <Image
            src={selected?.logo}
            width={'150px'}
            height={'150px'}
            alt="logo"
            style={{ padding: '5px', borderRadius: '5px' }}
            loading="lazy"
          />
        </Box>

        <Stack
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ width: '100%', height: '100%' }}>
            <Autocomplete
              open={open}
              fullWidth
              onOpen={handleOpen}
              onClose={handleClose}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              onChange={(event, exchange) => {
                handleSelectExchange(exchange ?? null)
              }}
              options={data}
              value={selected}
              loading={isLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chọn sàn"
                  onChange={(e) => handleSearchExchange(e.target.value)}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    },
                  }}
                />
              )}
            />
          </Box>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Điểm đánh giá:</Typography>
            <Stack
              sx={{
                ...getColorFromScore(selected?.total_point ?? 0),
                borderRadius: '8px',
              }}
              alignItems="center"
              justifyContent="center"
              marginLeft={'5px'}
              p={'5px'}
            >
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                {selected?.total_point}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack></Stack>
    </Box>
  )
}

export default ExchangeItem
