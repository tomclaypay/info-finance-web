import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../utils/create-emotion-cache'

export default class MyDocument extends Document {
  render() {
    // @ts-ignore
    const emotionStyleTags = this.props.emotionStyleTags
    return (
      <Html lang={this.props.locale}>
        <Head>
          {/* JSON-LD Organization */}
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `{
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "CÔNG TY TNHH INFO FINANCE XTRA",
                "url": "https://infofinance.com/",
                "sameAs": [
                  "https://infofx.com.vn/",
                  "https://www.facebook.com/infofinance.official",
                  "https://www.youtube.com/@InfoFinanceVN",
                  "https://t.me/+NZs8HUkbRxdiOTNl",
                  "https://www.tiktok.com/@infofinancevietnam",
                  "https://thanhnien.vn/infofinance-cong-cu-tra-cuu-san-chung-khoan-hang-dau-1851502117.htm",
                  "https://tuoitre.vn/info-finance-ra-mat-giao-dien-website-moi-trong-nam-2023-20230203112344558.htm"
                ],
                "logo": "https://infofinance.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.07f32361.png&w=256&q=75",
                "description": "Info Finance là nơi kiểm tra đánh giá các sàn forex trong và ngoài nước...",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "P.903, Tầng 9, Tòa nhà Diamond Plaza, 34 Lê Duẩn, Phường Bến Nghé, Quận 1",
                  "addressLocality": "Thành phố Hồ Chí Minh",
                  "addressRegion": "Việt Nam",
                  "postalCode": "700000",
                  "addressCountry": "Vietnam"
                },
                'contactPoint': { "@type": "ContactPoint", "telephone": " +84969116052", "contactType": "Tư vấn hỗ trợ" },
                "email": " cs@infofinance.com",
                "vatID": "0317093395"
              }`,
            }}
          />

          {/* ❌ GỠ Google Fonts: đã chuyển sang next/font */}
          {/*
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:..." rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=optional" />
          */}

          {/* Icons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/logo-infofx-16x16.png" />
          <link rel="icon" href="/logo-infofx-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/logo-infofx-16x16.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logo-infofx-16x16.png" />

          {/* Resource Hints: giới hạn ≤ 4 origins quan trọng */}
          <link rel="preconnect" href="https://api.infofinance.com" crossOrigin="" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="//api.infofinance.com" />

          <meta name="theme-color" content="#111827" />
          <meta name="dmca-site-verification" content="SmF1TXRsVzNvaW5rZEVSTkIwbzhNUDlsWlZCdUJzNS9samtUMGhCLy9oZz01" />

          {emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return { ...initialProps, emotionStyleTags }
}
