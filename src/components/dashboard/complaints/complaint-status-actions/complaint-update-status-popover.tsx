import { CANCEL_REQUEST_STATUS } from '@app/constants/common'
import { ComplaintContext } from '@app/contexts/complaint-context'
import { checkComplaintStatus } from '@app/utils/common'
import { Popover, Stack } from '@mui/material'
import { useContext } from 'react'
import ComplaintStatusTimeline from './complaint-status-timeline'
import ComplaintUpdateCancelRequest from './complaint-update-cancel-request'

interface ComplaintUpdateStatusPopoverProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

export default function ComplaintUpdateStatusPopover(props: ComplaintUpdateStatusPopoverProps) {
  const { anchorEl, handleClose } = props
  const {
    complaint: { status, cancelRequests },
  } = useContext(ComplaintContext)

  const hasCancelRequest =
    cancelRequests.length > 0 &&
    cancelRequests[cancelRequests.length - 1].status === CANCEL_REQUEST_STATUS.PENDING &&
    checkComplaintStatus(status)

  return (
    <Popover
      id={'complaint-update-popover'}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Stack position="relative" sx={{ minHeight: hasCancelRequest ? 300 : 0 }}>
        <Stack spacing={1} sx={{ opacity: hasCancelRequest ? 0.3 : 1 }}>
          <ComplaintStatusTimeline hasCancelRequest={hasCancelRequest} handleClose={handleClose} />
        </Stack>
        {hasCancelRequest && <ComplaintUpdateCancelRequest />}
      </Stack>
    </Popover>
  )
}
