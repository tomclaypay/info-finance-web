import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useAuth } from '@app/hooks/use-auth'

export const GuestGuard = (props: any) => {
  const { children } = props
  const auth = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      // You should remove the "disableGuard" check, because it's meant to be used only in the demo.
      if (auth.isAuthenticated) {
        router.push('/')
      } else {
        setChecked(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  )

  if (!checked) {
    return null
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>
}

GuestGuard.propTypes = {
  children: PropTypes.node,
}
