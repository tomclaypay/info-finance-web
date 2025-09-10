import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { ExpandMoreRounded } from '@mui/icons-material'
import { Box, Button, Link, MenuItem, MenuList } from '@mui/material'
import { ClickAwayListener } from '@mui/base'
import { useState } from 'react'
import Popper from '@mui/material/Popper'
import { styled } from '@mui/material/styles'

const Popup = styled(Popper)({
  zIndex: 1000,
})

interface MainNavbarItemProps {
  item: any
}

export default function MainNavbarItem({ item }: MainNavbarItemProps) {
  const router = useRouter()
  const locale = router.locale
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ height: '100%' }} onMouseLeave={handleClose}>
      <Button
        sx={{
          alignItems: 'center',
          display: {
            md: 'flex',
            xs: 'none',
          },
          height: '100%',
          padding: item.children ? '0 10px 0 20px' : '0 20px',
          '&:hover': {
            '&>a': {
              color: '#2A559C',
            },
            '&>svg': {
              color: 'primary.main',
            },
          },
        }}
        // className={
        //   !item.children && router.pathname === item.href
        //     ? 'active'
        //     : (item.children || item.href === '/events') &&
        //       router.pathname.startsWith(item.href.split('/lua-dao-chiem-doat-tai-san')[0])
        //     ? 'active'
        //     : ''
        // }
        className={
          router.pathname === item.href
            ? 'active'
            : item.href !== '/' && router.pathname.startsWith(item.href.split('/lua-dao')[0])
            ? 'active'
            : ''
        }
        id={item.title}
        aria-controls={open ? 'composition-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={item.children && handleClick}
        onMouseEnter={item.children && handleClick}
      >
        <NextLink href={item.href} passHref>
          <Link
            sx={{
              marginRight: '4px',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {item.title}
          </Link>
        </NextLink>
        {item.children ? (
          <ExpandMoreRounded
            sx={{
              color: router.pathname.startsWith(item.href.split('/lua-dao')[0]) ? 'primary' : '#0E0E2C',
            }}
          />
        ) : null}
      </Button>

      <Popup
        role={undefined}
        id={item.title}
        open={open}
        anchorEl={anchorEl}
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 0],
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList
            onMouseLeave={handleClose}
            sx={{
              boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05);',
              bgcolor: 'background.paper',
              pt: 0,
              pb: 0,
            }}
          >
            {item.title === 'Tin tức' &&
              item.children?.map((child: any) => (
                <NextLink key={child.id} href={`/news/${child.attributes?.slug}`} passHref>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      pt: 2,
                      pb: 2,
                      '&:hover': {
                        backgroundColor: '#F4F8FF',
                        '&>a': { color: 'primary.main' },
                      },
                    }}
                  >
                    <Link
                      sx={
                        {
                          // textTransform: 'capitalize',
                        }
                      }
                    >
                      {child.attributes.name}
                    </Link>
                  </MenuItem>
                </NextLink>
              ))}

            {item.title === 'Sự kiện' &&
              item.children?.map((child: any) => (
                <NextLink key={child.value} href={`/${child.value}`} passHref>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      pt: 2,
                      pb: 2,
                      '&:hover': {
                        backgroundColor: '#F4F8FF',
                        '&>a': { color: 'primary.main' },
                      },
                    }}
                  >
                    <Link
                      sx={
                        {
                          // textTransform: 'capitalize',
                        }
                      }
                    >
                      {child.display}
                    </Link>
                  </MenuItem>
                </NextLink>
              ))}
            {item.title === 'Đánh giá sàn' &&
              item.children?.map((child: any) => (
                <NextLink
                  key={child.id}
                  href={`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}/${child.slug}`}
                  passHref
                >
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      pt: 2,
                      pb: 2,
                      '&:hover': {
                        backgroundColor: '#F4F8FF',
                        '&>a': { color: 'primary.main' },
                      },
                    }}
                  >
                    <Link>{child.name}</Link>
                  </MenuItem>
                </NextLink>
              ))}
          </MenuList>
        </ClickAwayListener>
      </Popup>
      <style>{`
                .active {
                  position: relative;
                }
                .active::after {
                  content: "";
                  width: 100%;
                  height: 6px;
                  background-color: #2A559C;
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  transform: translateX(-50%)
                }
  
                .active a {
                  color: #2A559C;
                }
      `}</style>
    </Box>
  )
}
