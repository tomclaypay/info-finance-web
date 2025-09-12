import { useEffect } from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import nProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { RTL } from '../components/rtl'
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context'
import { AuthConsumer, AuthProvider } from '../contexts/amplify-context'
import { gtmConfig } from '../config'
import { gtm } from '../lib/gtm'
import { pageView } from '../lib/ga'
import { createTheme } from '../theme'
import createEmotionCache from '../utils/create-emotion-cache'
import { LicenseInfo } from '@mui/x-data-grid-pro'
import { appWithTranslation } from 'next-i18next'
import { ApolloProvider } from '@apollo/client'
import { ApolloClientContextProvider, ApolloClientContext } from '@app/contexts/apollo-client-context'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'photoswipe/dist/photoswipe.css'
import '../../public/assets/css/embla.css'
import '../../public/assets/css/global.css'
import '../../public/assets/css/content.css'
import BannerProvider from '@app/contexts/bannerContext'
import nextI18NextConfig from '../../next-i18next.config'
Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const clientSideEmotionCache = createEmotionCache()

LicenseInfo.setLicenseKey(
  '5451179d3e694bdc7044198a2ea106c0Tz01MjA4MSxFPTE2OTY3MzMzODE5NjIsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
)

const App = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const getLayout = Component.getLayout ?? ((page: any) => page)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      pageView(url)
    }

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    gtm.initialize(gtmConfig)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Info finance</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="google-site-verification" content="4041VCzdUOCZN8NZwBP5merne_cqOO8zE4bHeMsRYWY" />
        <meta property="og:image" content="https://i.imgur.com/Gs3ifN0.jpg" key="image" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
      </Head>
      <ApolloClientContextProvider>
        <ApolloClientContext.Consumer>
          {([apolloClient]) => (
            <ApolloProvider client={apolloClient}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <AuthProvider>
                  <SettingsProvider>
                    <SettingsConsumer>
                      {({ settings }) => (
                        <ThemeProvider
                          theme={createTheme({
                            direction: settings.direction,
                            responsiveFontSizes: settings.responsiveFontSizes,
                            mode: settings.theme,
                          })}
                        >
                          <RTL direction={settings.direction}>
                            <CssBaseline />
                            <Toaster position="top-center" />
                            <BannerProvider>
                              <AuthConsumer>{() => getLayout(<Component {...pageProps} />)}</AuthConsumer>
                            </BannerProvider>
                          </RTL>
                        </ThemeProvider>
                      )}
                    </SettingsConsumer>
                  </SettingsProvider>
                </AuthProvider>
              </LocalizationProvider>
            </ApolloProvider>
          )}
        </ApolloClientContext.Consumer>
      </ApolloClientContextProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
