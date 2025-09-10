import { COMPLAINT_STATUS, COMPLAINT_STATUS_COLOR, COMPLAINT_STATUS_LABEL } from '@app/constants/complaint'
import { Stack } from '@mui/material'

interface ComplaintStatusProps {
  status: COMPLAINT_STATUS
}

export default function ComplaintStatus({ status }: ComplaintStatusProps) {
  return (
    <Stack
      alignItems="center"
      sx={{
        py: 0.5,
        borderRadius: '10px',
        bgcolor: COMPLAINT_STATUS_COLOR[status],
        color: 'white',
        fontWeight: 600,
        textAlign: 'center',
      }}
    >
      {COMPLAINT_STATUS_LABEL[status]}
    </Stack>
  )
}
