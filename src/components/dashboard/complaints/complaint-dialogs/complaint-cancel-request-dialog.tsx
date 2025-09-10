import { CANCEL_REQUEST_STATUS } from '@app/constants/common'
import { ComplaintContext } from '@app/contexts/complaint-context'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useContext } from 'react'

interface ComplaintCancelRequestDialogProps {
  open: boolean
  action: CANCEL_REQUEST_STATUS
  handleClose: () => void
}

export default function ComplaintCancelRequestDialog(props: ComplaintCancelRequestDialogProps) {
  const { open, action, handleClose } = props
  const {
    complaint: { cancelRequests },
    onUpdateCancelRequest,
  } = useContext(ComplaintContext)

  const handleCancelRequest = () => {
    onUpdateCancelRequest({
      id: cancelRequests[0].id,
      status: action,
    })
    handleClose()
  }

  const isCancelAction = action === CANCEL_REQUEST_STATUS.APPROVED

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textTransform: 'capitalize' }}>
        {isCancelAction ? 'Đồng ý' : 'Từ chối'} huỷ khiếu nại
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ minWidth: 500 }}>
          Bạn có chắc chắn muốn {isCancelAction ? 'huỷ' : 'từ chối yêu cầu huỷ'} khiếu nại này không?
        </DialogContentText>
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
          onClick={handleCancelRequest}
        >
          {isCancelAction ? 'Huỷ khiếu nại' : 'Từ chối huỷ'}
        </Button>
        <Button onClick={handleClose}>Thoát</Button>
      </DialogActions>
    </Dialog>
  )
}
