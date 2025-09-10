import { useAuth } from '@app/hooks/use-auth'
import { Plus as PlusIcon } from '@app/icons/plus'
import { Box, Button, Stack, Typography } from '@mui/material'

interface SupervisorHeaderProps {
  handleCreateSupervisor: () => void
}

export default function SupervisorHeader({ handleCreateSupervisor }: SupervisorHeaderProps) {
  const auth = useAuth()

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography flex="1" variant="h4">
          Cơ quan giám sát quản lý
        </Typography>
        {auth?.user?.role === 'super_admin' && (
          <Button startIcon={<PlusIcon fontSize="small" />} variant="contained" onClick={handleCreateSupervisor}>
            Tạo cơ quan giám sát quản lý
          </Button>
        )}
      </Stack>
    </Box>
  )
}
