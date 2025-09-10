import { CANCEL_REQUEST_STATUS } from '@app/constants/common'
import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ComplaintCancelRequestDialog from '../complaint-dialogs/complaint-cancel-request-dialog'

export default function ComplaintUpdateCancelRequest() {
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState<CANCEL_REQUEST_STATUS>(CANCEL_REQUEST_STATUS.APPROVED)

  const handleClickOpen = (action: CANCEL_REQUEST_STATUS) => {
    setOpen(true)
    setAction(action)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Stack
      sx={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%)',
        bgcolor: 'white',
        p: 3,
        borderRadius: '10px',
        alignItems: 'center',
        width: '90%',
        boxShadow: '0px 0px 3px #898989',
      }}
    >
      <Typography textAlign="center">Khiếu nại này đang có yêu cầu huỷ. Vui lòng xử lý yêu cầu.</Typography>
      <Stack direction="row" spacing={3} mt={3}>
        <Button
          variant="outlined"
          onClick={() => {
            handleClickOpen(CANCEL_REQUEST_STATUS.APPROVED)
          }}
        >
          Đồng ý huỷ
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            handleClickOpen(CANCEL_REQUEST_STATUS.REJECTED)
          }}
        >
          Từ chối huỷ
        </Button>
      </Stack>
      <ComplaintCancelRequestDialog open={open} action={action} handleClose={handleClose} />
    </Stack>
  )
}
