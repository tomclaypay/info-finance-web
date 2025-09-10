import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Link, Typography } from '@mui/material'
import NextLink from 'next/link'

interface BackButtonProps {
  title: string
  link: string
}

export default function BackButton({ title, link }: BackButtonProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <NextLink href={`/${link}`} passHref>
        <Link
          color="textPrimary"
          component="a"
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="subtitle2" textTransform="capitalize">
            {title}
          </Typography>
        </Link>
      </NextLink>
    </Box>
  )
}
