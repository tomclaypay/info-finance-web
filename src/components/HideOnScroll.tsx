import { Slide, useScrollTrigger } from '@mui/material'
import { Props } from './main-navbar'

export const HideOnScroll = (props: Props) => {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 0,
    disableHysteresis: true,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger} unmountOnExit timeout={100} easing={'none'}>
      {children}
    </Slide>
  )
}
