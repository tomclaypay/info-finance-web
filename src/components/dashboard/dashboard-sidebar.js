import { Box, Divider, Drawer, Stack, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar as CalendarIcon } from '../../icons/calendar'
import { Reports as ReportsIcon } from '../../icons/reports'
import { Users as UsersIcon } from '../../icons/users'
import { Adjustments as AdjustmentsIcon } from '../../icons/adjustments'
import { Pencil as PencilIcon } from '../../icons/pencil'
import { Image as ImageIcon } from '../../icons/image'
import { Scrollbar } from '../scrollbar'
import { DashboardSidebarSection } from './dashboard-sidebar-section'
import { OrganizationPopover } from './organization-popover'
import { useAuth } from '@app/hooks/use-auth'

export const DashboardSidebar = (props) => {
  const getSections = (auth) => {
    if (auth.isAuthenticated && auth.user.role === 'member') {
      return [
        {
          title: 'Quản lý',
          items: [
            {
              title: 'Quản lý khiếu nại',
              path: '/dashboard/complaints',
              icon: <ReportsIcon fontSize="small" />,
              children: [
                {
                  title: 'Danh sách',
                  path: '/dashboard/complaints',
                },
              ],
            },

            {
              title: t('CsTeam'),
              path: '/dashboard/csteam/teams',
              icon: <UsersIcon fontSize="small" />,
              children: [
                {
                  title: t('Danh sách nhân viên'),
                  path: '/dashboard/csteam/members',
                },
              ],
            },
          ],
        },
      ]
    }
    if (auth.isAuthenticated && auth.user.role === 'leader') {
      return [
        {
          title: 'Quản lý',
          items: [
            {
              title: 'Quản lý khiếu nại',
              path: '/dashboard/complaints',
              icon: <ReportsIcon fontSize="small" />,
              children: [
                {
                  title: 'Danh sách',
                  path: '/dashboard/complaints',
                },
              ],
            },
            {
              title: t('CsTeams'),
              path: '/dashboard/csteam/teams',
              icon: <UsersIcon fontSize="small" />,
              children: [
                {
                  title: t('Danh sách nhóm'),
                  path: '/dashboard/csteam/teams',
                },
                {
                  title: t('Danh sách nhân viên'),
                  path: '/dashboard/csteam/members',
                },
              ],
            },
          ],
        },
      ]
    }

    if (auth.isAuthenticated && auth.user.role === 'super_admin') {
      return [
        {
          title: 'Quản lý',
          items: [
            {
              title: 'Quản lý khiếu nại',
              path: '/dashboard/complaints',
              icon: <ReportsIcon fontSize="small" />,
              children: [
                {
                  title: 'Danh sách',
                  path: '/dashboard/complaints',
                },
              ],
            },
            {
              title: 'Quản lý sự kiện',
              path: '/dashboard/events',
              icon: <CalendarIcon fontSize="small" />,
              children: [
                {
                  title: 'Danh sách',
                  path: '/dashboard/events',
                },
              ],
            },
            {
              title: t('CsTeams'),
              path: '/dashboard/csteam/teams',
              icon: <UsersIcon fontSize="small" />,
              children: [
                {
                  title: t('Danh sách nhóm'),
                  path: '/dashboard/csteam/teams',
                },
                {
                  title: t('Danh sách nhân viên'),
                  path: '/dashboard/csteam/members',
                },
              ],
            },
            {
              title: t('Sàn giao dịch'),
              path: '/dashboard/exchanges',
              icon: <AdjustmentsIcon fontSize="small" />,
              children: [
                {
                  title: t('Danh sách sàn'),
                  path: '/dashboard/exchanges',
                },
                {
                  title: t('Giấy phép sàn'),
                  path: '/dashboard/licenses',
                },
                {
                  title: t('Cơ quan giám sát quản lý'),
                  path: '/dashboard/supervisories',
                },
                {
                  title: t('Danh sách quốc gia'),
                  path: '/dashboard/nationals',
                },
              ],
            },

            {
              title: t('Quản lý review'),
              path: '/dashboard/feedbacks',
              icon: <PencilIcon fontSize="small" />,
              children: [
                {
                  title: t('Danh sách review'),
                  path: '/dashboard/feedbacks',
                },
              ],
            },

            {
              title: t('Banner'),
              path: '/dashboard/banners',
              icon: <ImageIcon fontSize="small" />,
              children: [
                {
                  title: t('Danh sách banner'),
                  path: '/dashboard/banners',
                },
              ],
            },
          ],
        },
      ]
    }
  }
  const { onClose, open } = props
  const router = useRouter()
  const auth = useAuth()
  const { t } = useTranslation()
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true,
  })
  const sections = useMemo(() => getSections(auth), [auth])
  const organizationsRef = useRef(null)
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState(false)

  const handlePathChange = () => {
    if (!router.isReady) {
      return
    }

    if (open) {
      onClose?.()
    }
  }

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  )

  // const handleOpenOrganizationsPopover = () => {
  //   setOpenOrganizationsPopover(true)
  // }

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false)
  }

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div>
            <Stack direction="row" sx={{ p: 3 }}>
              <Box component={NextLink} href="/">
                <Box sx={{ height: 80, width: '100%', position: 'relative', cursor: 'pointer' }}>
                  <Image alt="Logo" src="/static/full-logo.png" layout="fill" objectFit="cover" />
                </Box>
              </Box>
            </Stack>
            {/* <Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    Acme Inc
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {t('Your tier')} : Premium
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: 'neutral.500',
                    width: 14,
                    height: 14,
                  }}
                />
              </Box>
            </Box> */}
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections?.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
            }}
          />
          {/* <Box sx={{ p: 2 }}>
            <Typography color="neutral.100" variant="subtitle2">
              {t('Need Help?')}
            </Typography>
            <Typography color="neutral.500" variant="body2">
              {t('Check our docs')}
            </Typography>
            <NextLink href="/docs/welcome" passHref>
              <Button color="secondary" component="a" fullWidth sx={{ mt: 2 }} variant="contained">
                {t('Documentation')}
              </Button>
            </NextLink>
          </Box> */}
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => (theme.palette.mode === 'dark' ? 1 : 0),
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
