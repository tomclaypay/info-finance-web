/* eslint-disable @next/next/no-img-element */
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {
  idSplitted: string[]
  enabledIcon?: boolean
}

const ReviewId = ({ idSplitted, enabledIcon = true }: Props) => {
  return (
    <>
      <Stack>
        {enabledIcon && (
          <Box
            sx={{
              background: '#F1F1F1',
              width: '32px',
              height: '32px',
              borderRadius: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'static',
            }}
          >
            <img src={'/static/exchange-review/Vector.png'} alt="image of user" width={20} height={20} />
          </Box>
        )}
      </Stack>
      <Stack>
        <Typography>{`#${idSplitted?.[0].toUpperCase()}${idSplitted?.[1].toUpperCase()}`}</Typography>
      </Stack>
    </>
  )
}

export default ReviewId
