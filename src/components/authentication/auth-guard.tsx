import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useAuth } from '@app/hooks/use-auth'

export const AuthGuard = (props: any) => {
  const { children, authorized } = props
  const auth = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (!auth.isAuthenticated && auth.isInitialized) {
        router.push({
          pathname: '/authentication/login',
          query: { returnUrl: router.asPath },
        })
      } else {
        setChecked(true)
      }

      if (authorized && auth.isAuthenticated) {
        if (auth.user.role === 'anonymous' || auth.user.role === 'user') {
          router.push({
            pathname: '/',
            query: { returnUrl: router.asPath },
          })
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  )

  if (!checked) {
    return null
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>
}

AuthGuard.propTypes = {
  children: PropTypes.node,
  authorized: PropTypes.bool,
}
