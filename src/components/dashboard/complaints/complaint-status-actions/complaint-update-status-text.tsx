import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { Typography } from '@mui/material'
import { format } from 'date-fns'
import ComplaintStatus from '../complaint-cell/complaint-status'

interface ComplaintUpdateStatusTextProps {
  left?: boolean
  status?: COMPLAINT_STATUS
  timestamps?: string
}

export default function ComplaintUpdateStatusText({
  left = false,
  status,
  timestamps,
}: ComplaintUpdateStatusTextProps) {
  return (
    <>
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        {left
          ? timestamps && format(new Date(timestamps), 'hh:mm - dd/MM')
          : status && <ComplaintStatus status={status} />}
      </Typography>
    </>
  )
}
