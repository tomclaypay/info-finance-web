import { useMediaQuery, useTheme } from '@mui/material'

export const ROWS_PER_PAGE_OPTIONS = [10, 15, 20]

export const useMobile = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return isMobile
}
export const useDesktop = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  return isDesktop
}
export const useTablet = () => {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const isUpSm = useMediaQuery(theme.breakpoints.up('sm'))
  const isTablet = isDownMd && isUpSm
  return isTablet
}
