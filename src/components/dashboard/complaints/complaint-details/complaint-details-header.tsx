import UserProfile from '@app/components/dashboard/common/user-profile'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { Complaint, ComplaintLog } from '@app/interfaces/complaint'
import { CreateLogRefTypes } from '@app/pages/dashboard/complaints/[complaintId]'
import CreateIcon from '@mui/icons-material/Create'
import { Button, Grid } from '@mui/material'
import { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import ComplaintAddLogDialog from '../complaint-dialogs/complaint-add-log-dialog'

interface ComplaintDetailsHeaderProps {
  complaint?: Complaint
  onAddComplaintLog: (log: Partial<ComplaintLog>) => void
  addComplaintLogLoading?: boolean
}

function ComplaintDetailsHeader(
  { complaint, onAddComplaintLog, addComplaintLogLoading }: ComplaintDetailsHeaderProps,
  ref: Ref<CreateLogRefTypes>
) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useImperativeHandle(ref, () => ({
    handleClose,
  }))

  return (
    <Grid container justifyContent="space-between" spacing={3}>
      <Grid
        item
        sx={{
          alignItems: 'center',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <UserProfile user={complaint?.user} />
      </Grid>
      <Grid item sx={{ m: -1 }}>
        <Button endIcon={<CreateIcon fontSize="small" />} sx={{ m: 1 }} variant="outlined" onClick={handleClickOpen}>
          Tạo ghi chú
        </Button>
      </Grid>
      <ComplaintAddLogDialog
        complaintId={complaint?.id}
        open={open}
        handleClose={handleClose}
        onAddComplaintLog={onAddComplaintLog}
        addComplaintLogLoading={addComplaintLogLoading}
      />
    </Grid>
  )
}
export default forwardRef(ComplaintDetailsHeader)
