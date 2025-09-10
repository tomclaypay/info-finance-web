import { useMobile } from '@app/components/common'
import { Box, Container } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const EconomicCalendar = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const locale = router.locale
  const isMobile = useMobile()

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <h2 className="text-xl font-bold mb-4">📊 {t('calendar.economic')}</h2>
      <Box
        sx={{
          width: '100%',
          height: '600px',
          maxWidth: '650px',
          aspectRatio: '16 / 9',
        }}
      >
        <iframe
          src={
            locale === 'en' && isMobile
              ? 'https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timeselector,filters&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=day&timeZone=8&lang=1'
              : locale === 'en' && isMobile
              ? 'https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone,timeselector,filters&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=day&timeZone=8&lang=1'
              : locale !== 'en' && isMobile
              ? 'https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timeselector,filters&countries=33,14,4,34,38,32,6,11,51,5,39,72,60,110,43,35,71,22,36,26,12,9,37,25,178,10,17&calType=day&timeZone=2&lang=52'
              : 'https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone,timeselector,filters&countries=33,14,4,34,38,32,6,11,51,5,39,72,60,110,43,35,71,22,36,26,12,9,37,25,178,10,17&calType=day&timeZone=27&lang=52'
          }
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        ></iframe>
        <div className="poweredBy" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <span style={{ fontSize: '11px', color: '#333333', textDecoration: 'none' }}>
            Lịch Kinh Tế theo Thời Gian Thực được cung cấp bởi{' '}
            <a
              href="https://vn.Investing.com/"
              rel="noreferrer"
              target="_blank"
              style={{ fontSize: '11px', color: '#06529D', fontWeight: 'bold' }}
              className="underline_link"
            >
              Investing.com Việt Nam
            </a>
          </span>
        </div>
      </Box>
    </Container>
  )
}

export default EconomicCalendar
