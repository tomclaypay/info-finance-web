import awsConfig from './aws-exports'

const isLocalhost =
  typeof window === 'undefined'
    ? false
    : Boolean(
        window.location.hostname === 'localhost' ||
          // [::1] is the IPv6 localhost address.
          window.location.hostname === '[::1]' ||
          // 127.0.0.1/8 is considered localhost for IPv4.
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
      )

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, productionRedirectSignIn] = awsConfig.oauth.redirectSignIn.split(',')

const [localRedirectSignOut, productionRedirectSignOut] = awsConfig.oauth.redirectSignOut.split(',')

export const amplifyConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  },
}

export const gtmConfig = {
  containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
}
