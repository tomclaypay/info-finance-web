import { ComplaintLog } from '@app/interfaces/complaint'
import { CircularProgress, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ComplaintLogForm from '../complaint-forms/complaint-log-form'

interface ComplaintAddLogDialogProps {
  open: boolean
  complaintId?: string
  handleClose: () => void
  onAddComplaintLog: (log: Partial<ComplaintLog>) => void
  addComplaintLogLoading?: boolean
}

export default function ComplaintAddLogDialog({
  open,
  complaintId,
  handleClose,
  onAddComplaintLog,
  addComplaintLogLoading,
}: ComplaintAddLogDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Tạo ghi chú</DialogTitle>
      <DialogContent sx={{ width: '100%' }}>
        <ComplaintLogForm complaintId={complaintId} onSubmit={onAddComplaintLog} />
        {addComplaintLogLoading && (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              position: 'absolute',
              top: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: '100',
            }}
          >
            <CircularProgress />
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  )
}
