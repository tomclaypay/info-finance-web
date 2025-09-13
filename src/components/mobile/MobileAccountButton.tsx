import { useAuth } from '@app/hooks/use-auth'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-initials-sprites'
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded'
import { Link, Stack } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRef, useState } from 'react'
import { AccountPopover } from '../dashboard/account-popover'

function MobileAccountButton() {
  const anchorRef = useRef(null)
  const [openPopover, setOpenPopover] = useState(false)
  const { user, isAuthenticated } = useAuth()

  const defaultAvatar = createAvatar(style, {
    seed: user ? user?.displayName || user?.fullname : '',
    dataUri: true,
  })

  const handleOpenPopover = () => {
    setOpenPopover(true)
  }

  const handleClosePopover = () => {
    setOpenPopover(false)
  }

  if (!isAuthenticated) {
    return (
      <Link component={NextLink} href="/authentication/login" passHref>
        <PermIdentityRoundedIcon />
      </Link>
    )
  } else {
    return (
      <>
        <Stack direction="row" onClick={handleOpenPopover} ref={anchorRef}>
          <Image
            src={user?.avatar || defaultAvatar}
            alt="logo"
            height={32}
            width={32}
            style={{ borderRadius: '50%' }}
            loading="lazy"
          />
        </Stack>
        <AccountPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
      </>
    )
  }
}

export default MobileAccountButton
