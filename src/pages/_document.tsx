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
          <script async src={`https://www.googletagmanager.com/gtag/js?id=G-KD0C018E6C`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KD0C018E6C', {
                page_path: window.location.pathname,
            });
            `,
            }}
          />
          <script
            type="application/ld+json"
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
              "description": "Info Finance là nơi kiểm tra đánh giá các sàn forex trong và ngoài nước với quy trình đánh giá uy tín của các chuyên gia. Tiếp nhận các nghi vấn lừa đảo từ nhà đầu tư với sàn forex cùng bằng chứng cụ thể. Thông tin sự kiện trong ngành tài chính.",
              "address": {
              "@type": "PostalAddress",
              "streetAddress": "P.903, Tầng 9, Tòa nhà Diamond Plaza, 34 Lê Duẩn, Phường Bến Nghé, Quận 1",
              "addressLocality": "Thành phố Hồ Chí Minh",
              "addressRegion": "Việt Nam",
              "postalCode": "700000",
              "addressCountry": "Vietnam"
              },
              "contactPoint": {
              "@type": "ContactPoint",
              "telephone": " +84969116052",
              "contactType": "Tư vấn hỗ trợ"
              },
              "email": " cs@infofinance.com",
              "vatID": "0317093395"
              }`,
            }}
          />

          {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && (
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `(function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "i8r0o765be");`,
              }}
            />
          )}
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=optional"
          />
          <script async src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
          {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> */}
          <link rel="apple-touch-icon" sizes="180x180" href="/logo-infofx-16x16.png" />
          <link rel="icon" href="/logo-infofx-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/logo-infofx-16x16.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logo-infofx-16x16.png" />
          <link rel="preconnect" href="https://api.infofinance.com" crossOrigin="true" />
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

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
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
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}
