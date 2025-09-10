import { COMPLAINT_STATUS, COMPLAINT_STATUS_COLOR, COMPLAINT_STATUS_LABEL } from '@app/constants/complaint'
import { ComplaintContext } from '@app/contexts/complaint-context'
import { Stack } from '@mui/material'
import { useContext } from 'react'

interface ComplaintStatusProps {
  status: COMPLAINT_STATUS
}

export default function ComplaintCancelStatus({ status }: ComplaintStatusProps) {
  const { hasCancelRequest } = useContext(ComplaintContext)

  return (
    <Stack
      alignItems="center"
      sx={{
        py: 0.5,
        borderRadius: '10px',
        bgcolor: hasCancelRequest ? '#FFCD1A' : COMPLAINT_STATUS_COLOR[status],
        color: hasCancelRequest ? 'black' : 'white',
        fontWeight: 600,
        textAlign: 'center',
      }}
    >
      {hasCancelRequest ? 'Yêu cầu huỷ' : COMPLAINT_STATUS_LABEL[status]}
    </Stack>
  )
}
