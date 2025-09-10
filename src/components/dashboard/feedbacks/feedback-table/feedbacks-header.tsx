import { useAuth } from '@app/hooks/use-auth'
import { Plus as PlusIcon } from '@app/icons/plus'
import { Box, Button, Stack, Typography } from '@mui/material'

interface FeedbackHeaderProps {
  handleCreateFeedback: () => void
}

export default function FeedbacksHeader({ handleCreateFeedback }: FeedbackHeaderProps) {
  const auth = useAuth()

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="flex-end" spacing={3}>
          <Typography variant="h4">Review sàn giao dịch</Typography>
        </Stack>

        {auth?.user?.role === 'super_admin' && (
          <>
            <Button startIcon={<PlusIcon fontSize="small" />} variant="contained" onClick={handleCreateFeedback}>
              Tạo review
            </Button>
          </>
        )}
      </Stack>
    </Box>
  )
}
