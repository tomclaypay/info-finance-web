import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

interface ComplaintCancelRequestDialogProps {
  open: boolean
  alert: string
  handleClose: () => void
}

export default function PopupAlert(props: ComplaintCancelRequestDialogProps) {
  const { open, alert, handleClose } = props

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textTransform: 'capitalize' }}>{alert}</DialogTitle>
    </Dialog>
  )
}
