import {
  RESULT_STATUS_AFTER_ACTION,
  COMPLAINT_UPDATE_ACTION,
  COMPLAINT_UPDATE_ACTION_LABEL,
} from '@app/constants/complaint'
import { ComplaintContext } from '@app/contexts/complaint-context'
import { Divider } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useContext, useRef } from 'react'

interface ComplaintUpdateStatusDialogProps {
  action: COMPLAINT_UPDATE_ACTION
  open: boolean
  left?: boolean
  handleClose: () => void
}

export default function ComplaintUpdateStatusDialog(props: ComplaintUpdateStatusDialogProps) {
  const { action, open, left, handleClose } = props

  const {
    complaint: { id },
    onUpdateComplaintStatus,
  } = useContext(ComplaintContext)
  const reasonRef = useRef<HTMLInputElement>()

  const handleUpdateComplaintStatus = () => {
    onUpdateComplaintStatus({
      complaintId: id,
      status: RESULT_STATUS_AFTER_ACTION[action],
      closeReason: reasonRef.current?.value || '',
      description: '',
    })
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textTransform: 'capitalize' }}>{COMPLAINT_UPDATE_ACTION_LABEL[action]}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText sx={{ minWidth: 500 }}>
          {left
            ? `Bạn chắc chắn muốn  ${COMPLAINT_UPDATE_ACTION_LABEL[action]} khiếu nại này không?`
            : `Vui lòng nhập thông tin để ${COMPLAINT_UPDATE_ACTION_LABEL[action]} khiếu nại này`}
        </DialogContentText>
        {!left && <TextField fullWidth label="Lý do" variant="standard" inputRef={reasonRef} />}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            textTransform: 'capitalize',
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              opacity: '0.9',
              backgroundColor: 'primary.main',
              color: 'white',
            },
          }}
          onClick={handleUpdateComplaintStatus}
        >
          {COMPLAINT_UPDATE_ACTION_LABEL[action]}
        </Button>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  )
}
