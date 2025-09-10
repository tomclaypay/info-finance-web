import {
  COMPLAINT_STATUS_ACTIONS,
  COMPLAINT_UPDATE_ACTION,
  COMPLAINT_UPDATE_ACTION_LABEL,
} from '@app/constants/complaint'
import { ComplaintContext } from '@app/contexts/complaint-context'
import { Button, Stack } from '@mui/material'
import { useContext, useState } from 'react'
import ComplaintUpdateStatusDialog from '../complaint-dialogs/complaint-update-status-dialog'

interface ComplaintUpdateStatusActionProps {
  left?: boolean
  disabled?: boolean
  handleClosePopover: () => void
}

export default function ComplaintUpdateStatusAction({
  left = false,
  disabled,
  handleClosePopover,
}: ComplaintUpdateStatusActionProps) {
  const { currentStatus } = useContext(ComplaintContext)
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    handleClosePopover()
  }

  return (
    <>
      {currentStatus && (
        <Stack>
          <Button
            variant="outlined"
            sx={{ width: 150 }}
            color={left ? 'primary' : 'error'}
            disabled={disabled}
            onClick={handleClickOpen}
          >
            {COMPLAINT_UPDATE_ACTION_LABEL[COMPLAINT_STATUS_ACTIONS[currentStatus]?.[left ? 0 : 1]]}
          </Button>
          <ComplaintUpdateStatusDialog
            left={left}
            action={COMPLAINT_STATUS_ACTIONS[currentStatus]?.[left ? 0 : 1] as COMPLAINT_UPDATE_ACTION}
            open={open}
            handleClose={handleClose}
          />
        </Stack>
      )}
    </>
  )
}
