import { DialogTitle, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import { ComplaintContractForm } from '../complaint-forms/complaint-contract-form'

interface ComplaintUploadContractDialogProps {
  open: boolean
  complaintId: string
  handleClose: () => void
}

export default function ComplaintUploadContractDialog({
  open,
  complaintId,
  handleClose,
}: ComplaintUploadContractDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Tải lên hợp đồng</DialogTitle>
      <DialogContent>
        <Typography color="error.main" textAlign="center" variant="body2">
          Lưu ý: Bạn chỉ có thể tải lên tối đa 5 files
        </Typography>
        <ComplaintContractForm complaintId={complaintId} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
