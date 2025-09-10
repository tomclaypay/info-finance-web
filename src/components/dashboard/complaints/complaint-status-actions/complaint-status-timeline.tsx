import { COMPLAINT_STATUS_ACTIONS } from '@app/constants/complaint'
import { ComplaintContext } from '@app/contexts/complaint-context'
import { checkComplaintStatus, getComplaintGroupAction, getNextComplaintGroupAction } from '@app/utils/common'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Timeline from '@mui/lab/Timeline'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import ComplaintUpdateStatusAction from './complaint-update-status-action'
import ComplaintUpdateStatusText from './complaint-update-status-text'

interface ComplaintStatusTimelineProps {
  hasCancelRequest: boolean
  handleClose: () => void
}

export default function ComplaintStatusTimeline(props: ComplaintStatusTimelineProps) {
  const { hasCancelRequest, handleClose } = props
  const {
    oldStatuses,
    currentStatus,
    complaint: { status },
  } = useContext(ComplaintContext)

  return (
    <Timeline position="right" sx={{ pt: 3, rowGap: 2 }}>
      {oldStatuses?.map(({ newStatus, oldStatus, createdAt }) => (
        // eslint-disable-next-line react/jsx-key
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0', minWidth: 150 }} align="center">
            <ComplaintUpdateStatusText left status={newStatus} timestamps={createdAt} />
          </TimelineOppositeContent>
          <TimelineSeparator sx={{ position: 'relative' }}>
            <Typography
              textAlign="center"
              sx={{
                position: 'absolute',
                top: -22,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 300,
                fontWeight: 500,
              }}
            >
              {newStatus && getComplaintGroupAction(newStatus, oldStatus)}
            </Typography>
            <TimelineDot sx={{ alignSelf: 'center' }} color={checkComplaintStatus(newStatus) ? 'success' : 'error'}>
              {checkComplaintStatus(newStatus) ? <CheckIcon /> : <CloseIcon />}
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Stack justifyContent="center" height="100%" sx={{ minWidth: 150 }}>
              <ComplaintUpdateStatusText status={newStatus} />
            </Stack>
          </TimelineContent>
        </TimelineItem>
      ))}
      {currentStatus && status === currentStatus && COMPLAINT_STATUS_ACTIONS[currentStatus] && !hasCancelRequest && (
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0', minWidth: 150 }} align="center">
            <ComplaintUpdateStatusAction left handleClosePopover={handleClose} />
          </TimelineOppositeContent>
          <TimelineSeparator sx={{ position: 'relative' }}>
            <Typography
              textAlign="center"
              sx={{
                position: 'absolute',
                top: -22,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 300,
                fontWeight: 500,
              }}
            >
              {getNextComplaintGroupAction(currentStatus)}
            </Typography>
            <TimelineDot sx={{ alignSelf: 'center' }} color="grey">
              <CheckIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Stack justifyContent="center" height="100%" sx={{ minWidth: 150 }}>
              <ComplaintUpdateStatusAction handleClosePopover={handleClose} />
            </Stack>
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  )
}
