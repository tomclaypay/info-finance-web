import { Box, Stack } from '@mui/material'
import React from 'react'
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone'
import { blueGrey } from '@mui/material/colors'

interface IProps {
  src: string
}

const ThumbnailCell = ({ src }: IProps) => (
  <Box height="100%" p={1}>
    {src ? (
      <Box
        borderRadius={1}
        sx={{ objectFit: 'cover', objectPosition: 'center', border: '0.5px solid rgba(0,0,0,0.2)' }}
        height="100%"
        width={100}
        component="img"
        src={src}
      />
    ) : (
      <Stack
        alignItems="center"
        justifyContent="center"
        borderRadius={1}
        sx={{ bgcolor: blueGrey[50] }}
        height="100%"
        width={100}
      >
        <ImageNotSupportedTwoToneIcon fontSize="large" sx={{ color: blueGrey[200] }} />
      </Stack>
    )}
  </Box>
)

export default ThumbnailCell
