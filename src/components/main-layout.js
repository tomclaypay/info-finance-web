import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { Footer } from './footer'
import MainNavbar from './main-navbar'
import { MainSidebar } from './main-sidebar'
import { Box } from '@mui/material'
import { useDesktop, useMobile } from './common'
import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { useContext } from 'react'
import { BannerContext } from '@app/contexts/bannerContext'

const MainLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  overflowX: 'hidden',
}))

export const MainLayout = ({ children }) => {
  const isDesktop = useDesktop()
  const isMobile = useMobile()
  const { data } = useBanner({ position: isMobile ? BannerPosition.HeaderMobile : BannerPosition.HeaderDesktop })
  const { setBanner } = useContext(BannerContext)
  if (data) {
    setBanner(data)
  }
  return (
    <MainLayoutRoot>
      <Box pt={[6, 8]} />
      <MainNavbar />
      <MainSidebar />
      <main style={{ marginTop: !data ? 0 : isDesktop ? '200px' : '60px' }}>{children}</main>
      <Footer />
    </MainLayoutRoot>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node,
}
