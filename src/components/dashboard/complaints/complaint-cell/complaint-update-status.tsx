import { useAuth } from '@app/hooks/use-auth'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { IconButton } from '@mui/material'
import { MouseEvent, useState } from 'react'
import ComplaintUpdateStatusPopover from '../complaint-status-actions/complaint-update-status-popover'

interface ComplaintUpdateStatusProps {
  handledByMemberId?: boolean
}
export default function ComplaintUpdateStatus({ handledByMemberId }: ComplaintUpdateStatusProps) {
  const auth = useAuth()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {handledByMemberId || auth?.user?.role === 'super_admin' ? (
        <IconButton aria-describedby={'complaint-update-popover'} onClick={handleClick}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      ) : null}
      <ComplaintUpdateStatusPopover anchorEl={anchorEl} handleClose={handleClose} />
    </>
  )
}
