// import PropTypes from 'prop-types'
import { AccountButton } from '@app/components/dashboard/dashboard-navbar'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Container, InputBase, Link, Stack, SwipeableDrawer, Toolbar } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import logo from '../../public/static/header/main-logo.png'
import { useMobile } from './common'
import LanguagePicker from './language/LangugePicker'
import MainNavbarItem from './main-navbar-item'
import MobileAccountButton from './mobile/MobileAccountButton'
import { SearchHeaderIcon } from '@app/icons'
import SearchHeader from './search-header'

import { useMediaQuery, useTheme } from '@mui/material'
import 'animate.css'
import { throttle } from 'lodash'
import { BannerContext } from '@app/contexts/bannerContext'
import BannerHeader from './banner/HeaderBanner'
export interface Props {
  window?: () => Window
  children: React.ReactElement
}

export default function MainNavbar() {
  const { t } = useTranslation('common')
  const isMobile = useMobile()

  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [mobileMenu, setMobileMenu] = useState(false)
  const router = useRouter()
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
  const valueSearch = router.query.value
  const [fieldSearch, setFieldSearch] = useState(valueSearch)
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldSearch(e.target.value)
  }
  const appBarRef = useRef(null)
  const appBarMobileRef = useRef(null)
  const navList = useMemo(
    () => [
      { title: t(`header.exchange`), href: router.locale === 'vi' ? '/tra-cuu-san' : '/broker' },
      { title: t(`header.payment-service`), href: router.locale === 'vi' ? '/dich-vu-thanh-toan' : '/payment-service' },
      { title: t(`header.news`), href: router.locale === 'vi' ? '/tin-tuc' : '/news' },
      // { title: t(`header.event`), href: router.locale === 'vi' ? '/su-kien' : '/events' },
      { title: t(`header.economic-calendar`), href: router.locale === 'vi' ? '/lich-kinh-te' : '/economic-calendar' },
      { title: t(`header.knowledge`), href: router.locale === 'vi' ? '/kien-thuc' : '/knowledge' },
      { title: t(`header.complaint`), href: router.locale === 'vi' ? '/danh-gia-san' : '/exchange-review' },
      // { title: t(`header.aboutUs`), href: router.locale === 'vi' ? '/gioi-thieu' : '/about' },
    ],
    [t, router.locale]
  )
  const { banner } = useContext(BannerContext)

  const isScroll = useRef(false)

  const handleScroll = useCallback(
    throttle(() => {
      const scrollY = window.scrollY
      const scrollCondition = scrollY > 100
      const appBar = appBarRef.current
      const appBarMobile = appBarMobileRef.current

      if (isScroll.current) {
        if (scrollCondition) {
          appBar?.classList.remove('go-from-top')
          appBar?.classList.add('go-to-top')
          appBarMobile?.classList.remove('go-from-top-mobile')
          appBarMobile?.classList.add('go-to-top-mobile')
        } else {
          appBar?.classList.remove('go-to-top')
          appBar?.classList.add('go-from-top')
          appBarMobile?.classList.remove('go-to-top-mobile')
          appBarMobile?.classList.add('go-from-top-mobile')
        }
      }

      isScroll.current = scrollCondition
    }, 100),
    []
  )

  useEffect(() => {
    if (!banner) return
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [banner, handleScroll])

  if (isMobile || isTablet) {
    return (
      <AppBar
        ref={appBarMobileRef}
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: isMobile ? 'none' : '0px 4px 95px rgba(0, 0, 0, 0.1)',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box width="100%" className="banner-header">
          <BannerHeader />
        </Box>

        <Toolbar
          sx={{
            height: '100%',
            width: '100%',
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: isMobile ? 2 : 0,
          }}
        >
          <MenuIcon onClick={() => setMobileMenu(!mobileMenu)} />
          <SwipeableDrawer
            sx={{ mt: 200 }}
            anchor="left"
            open={mobileMenu}
            onClose={() => setMobileMenu(false)}
            onOpen={() => setMobileMenu(true)}
          >
            <Box sx={{ pt: 10, px: 3, mt: '60px' }} role="presentation" width={'100vw'}>
              <Stack spacing={5}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '50px',
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'subtitle.main',
                    display: 'flex',
                    width: '100%',
                    paddingX: '24px',
                    paddingY: '12px',
                  }}
                >
                  <SearchHeaderIcon
                    onClick={() => {
                      setMobileMenu(false)
                      setIsSearchBarOpen(false)
                      router.push({
                        pathname: '/search',
                        query: { keyword: fieldSearch },
                      })
                    }}
                  />
                  <InputBase
                    onKeyDown={(ev) => {
                      if (ev.key === 'Enter') {
                        setIsSearchBarOpen(false)
                        setMobileMenu(false)
                        router.push({
                          pathname: '/search',
                          query: { keyword: fieldSearch },
                        })
                      }
                    }}
                    placeholder={t('searchPlacehoder')}
                    inputProps={{ 'aria-label': 'search' }}
                    value={fieldSearch}
                    onChange={handleInput}
                    sx={{
                      color: 'inherit',
                      '& .MuiInputBase-input': {
                        padding: '0 0 0 1em',
                      },
                      width: '100%',
                    }}
                  />
                </Box>
                {navList.map((item, index) => (
                  <NextLink key={index} href={item.href} passHref>
                    <Link
                      onClick={() => setMobileMenu(false)}
                      sx={{
                        color:
                          router.pathname === item.href
                            ? 'primary.main'
                            : item.href !== '/' && router.pathname.startsWith(item.href.split('/lua-dao')[0])
                            ? 'primary.main'
                            : 'text',
                      }}
                    >
                      {item.title}
                    </Link>
                  </NextLink>
                ))}
                <LanguagePicker />
              </Stack>
            </Box>
          </SwipeableDrawer>
          <NextLink href="/" passHref>
            <Image src={logo} alt="logo" height={40} width={100} loading="lazy" />
          </NextLink>
          <MobileAccountButton />
        </Toolbar>
      </AppBar>
    )
  }

  return (
    <>
      <AppBar
        ref={appBarRef}
        sx={{
          backgroundColor: 'background.paper',
          padding: '0',
          boxShadow: '0px 4px 95px rgba(0, 0, 0, 0.1)',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
        }}
      >
        <Box width="100%">
          <BannerHeader />
        </Box>
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: 'background.paper',
            height: '100%',
            margin: '0',
            paddingLeft: '0',
            paddingRight: '0',
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              marginLeft: '-24px',
              height: '80px',
              marginRight: '-14px',
            }}
          >
            <NextLink href="/" passHref>
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Image src={logo} alt="logo" height={60} width={144} loading="lazy" />
              </Box>
            </NextLink>

            <Box
              sx={{
                alignItems: 'center',
                flex: '1',
                display: {
                  md: 'flex',
                  xs: 'none',
                },
                height: '100%',
              }}
            >
              {navList.map((item, index) => (
                <Box key={index} sx={{ height: '100%' }}>
                  <MainNavbarItem item={item} />
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                alignItems: 'center',
                display: {
                  md: 'flex',
                  xs: 'none',
                },
              }}
            >
              <Box
                display={router.pathname.startsWith('/search') ? 'none' : 'block'}
                sx={{
                  marginRight: '16px',
                }}
              >
                <SearchHeaderIcon onClick={() => setIsSearchBarOpen(!isSearchBarOpen)} style={{ cursor: 'pointer' }} />
              </Box>
              <AccountButton />
              <LanguagePicker />
            </Box>
          </Toolbar>
        </Container>
        {isSearchBarOpen && <SearchHeader onClose={() => setIsSearchBarOpen(false)} />}
      </AppBar>
    </>
  )
}
