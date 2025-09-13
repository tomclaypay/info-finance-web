import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-initials-sprites'
import { ExpandMoreRounded } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Stack } from '@mui/system'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRef, useState } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { Menu as MenuIcon } from '../../icons/menu'
import { AccountPopover } from './account-popover'

// const languages = {
//   en: '/static/icons/uk_flag.svg',
//   de: '/static/icons/de_flag.svg',
//   es: '/static/icons/es_flag.svg',
// }

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}))

// const LanguageButton = () => {
//   const anchorRef = useRef(null)
//   const { i18n } = useTranslation()
//   const [openPopover, setOpenPopover] = useState(false)

//   const handleOpenPopover = () => {
//     setOpenPopover(true)
//   }

//   const handleClosePopover = () => {
//     setOpenPopover(false)
//   }

//   return (
//     <>
//       <IconButton onClick={handleOpenPopover} ref={anchorRef} sx={{ ml: 1 }}>
//         <Box
//           sx={{
//             display: 'flex',
//             height: 20,
//             width: 20,
//             '& img': {
//               width: '100%',
//             },
//           }}
//         >
//           <img alt="" src={languages[i18n.language]} />
//         </Box>
//       </IconButton>
//       <LanguagePopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
//     </>
//   )
// }

// const ContentSearchButton = () => {
//   const [openDialog, setOpenDialog] = useState(false)

//   const handleOpenSearchDialog = () => {
//     setOpenDialog(true)
//   }

//   const handleCloseSearchDialog = () => {
//     setOpenDialog(false)
//   }

//   return (
//     <>
//       <Tooltip title="Search">
//         <IconButton onClick={handleOpenSearchDialog} sx={{ ml: 1 }}>
//           <SearchIcon fontSize="small" />
//         </IconButton>
//       </Tooltip>
//       <ContentSearchDialog onClose={handleCloseSearchDialog} open={openDialog} />
//     </>
//   )
// }

// const ContactsButton = () => {
//   const anchorRef = useRef(null)
//   const [openPopover, setOpenPopover] = useState(false)

//   const handleOpenPopover = () => {
//     setOpenPopover(true)
//   }

//   const handleClosePopover = () => {
//     setOpenPopover(false)
//   }

//   return (
//     <>
//       <Tooltip title="Contacts">
//         <IconButton onClick={handleOpenPopover} sx={{ ml: 1 }} ref={anchorRef}>
//           <UsersIcon fontSize="small" />
//         </IconButton>
//       </Tooltip>
//       <ContactsPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
//     </>
//   )
// }

// const NotificationsButton = () => {
//   const anchorRef = useRef(null)
//   const [unread, setUnread] = useState(0)
//   const [openPopover, setOpenPopover] = useState(false)
//   // Unread notifications should come from a context and be shared with both this component and
//   // notifications popover. To simplify the demo, we get it from the popover

//   const handleOpenPopover = () => {
//     setOpenPopover(true)
//   }

//   const handleClosePopover = () => {
//     setOpenPopover(false)
//   }

//   const handleUpdateUnread = (value) => {
//     setUnread(value)
//   }

//   return (
//     <>
//       <Tooltip title="Notifications">
//         <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleOpenPopover}>
//           <Badge color="error" badgeContent={unread}>
//             <BellIcon fontSize="small" />
//           </Badge>
//         </IconButton>
//       </Tooltip>
//       <NotificationsPopover
//         anchorEl={anchorRef.current}
//         onClose={handleClosePopover}
//         onUpdateUnread={handleUpdateUnread}
//         open={openPopover}
//       />
//     </>
//   )
// }

export const AccountButton = () => {
  const anchorRef = useRef(null)
  const [openPopover, setOpenPopover] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const { t } = useTranslation()

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
      <Stack direction="row">
        <Button
          href="/authentication/login"
          passHref
          component={NextLink}
          sx={{
            height: '48px',
            padding: '13px 32px',
            borderColor: '#2A559C',
            borderRadius: '24px',
            marginRight: '30px',
            width: 'max-content',
          }}
          variant="outlined"
        >
          {t('logIn')}
          {/* {t('footer.description2')} */}
        </Button>
      </Stack>
    )
  }

  return (
    <>
      <Stack
        direction="row"
        component={Button}
        onClick={handleOpenPopover}
        ref={anchorRef}
        variant="outlined"
        sx={{
          height: '48px',
          padding: '13px 8px',
          borderColor: '#2A559C',
          borderRadius: '24px',
          marginRight: '30px',
        }}
      >
        <Image src={user?.avatar || defaultAvatar} alt="logo" height={32} width={32} style={{ borderRadius: 32 }} />
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '14px',
            color: 'primary',
            margin: '0 5px 0 10px',
          }}
        >
          {user?.displayName || user?.fullname}
        </Typography>
        <ExpandMoreRounded />
      </Stack>

      <AccountPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
    </>
  )
}

export const DashboardNavbar = (props) => {
  const { onOpenSidebar, ...other } = props

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {/* <LanguageButton /> */}
          {/* <ContentSearchButton /> */}
          {/* <ContactsButton /> */}
          {/* <NotificationsButton /> */}
          <AccountButton />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  )
}
