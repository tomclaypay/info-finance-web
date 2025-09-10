import { useAuth } from '@app/hooks/use-auth'
import { Plus as PlusIcon } from '@app/icons/plus'
import { Box, Button, Stack, Typography } from '@mui/material'

interface BannerHeaderProps {
  handleCreateBanner: () => void
}

export default function BannerHeader({ handleCreateBanner }: BannerHeaderProps) {
  const auth = useAuth()

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography flex="1" variant="h4">
          Banner
        </Typography>
        {auth?.user?.role === 'super_admin' && (
          <Button startIcon={<PlusIcon fontSize="small" />} variant="contained" onClick={handleCreateBanner}>
            Tạo banner
          </Button>
        )}
      </Stack>
    </Box>
  )
}
