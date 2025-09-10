import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

interface BackButtonProps {
  title: string
  link: string
  page: string
  limit: string
}

export default function BackButtonInitial({ title, link, page, limit }: BackButtonProps) {
  const router = useRouter()
  return (
    <Stack
      direction="row"
      sx={{ mb: 4, cursor: 'pointer', width: 'max-content' }}
      spacing={1}
      onClick={() =>
        router.push({
          pathname: `/${link}`,
          query: {
            initialPage: page,
            initialLimit: limit,
          },
        })
      }
    >
      <ArrowBackIcon fontSize="small" />
      <Typography variant="subtitle2" textTransform="capitalize">
        {title}
      </Typography>
    </Stack>
  )
}
