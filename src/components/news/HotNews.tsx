import { Box, Container, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import { useMobile } from '../common'
import HotNewsItem from './HotNews-item'
interface HotNewsProps {
  data: any
}
const HotNews = ({ data }: HotNewsProps) => {
  const { t } = useTranslation('common')
  const isMobile = useMobile()
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: isMobile ? 2 : 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ flex: '1', mb: 3, textAlign: 'center' }}>
          {t('news.hot')}
        </Typography>
        {isMobile ? (
          <Carousel
            autoPlay={false}
            sx={{
              height: '90%',
              mb: 1,
            }}
            swipe
            cycleNavigation={true}
            animation="slide"
            navButtonsAlwaysVisible={isMobile && false}
            indicatorContainerProps={{
              style: {
                zIndex: '10',
                position: 'absolute',
                bottom: isMobile ? '5px' : '70px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'max-content',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                backgroundColor: '#2A559C',
                border: '1px solid #2A559C',
              },
            }}
            indicatorIconButtonProps={{
              style: {
                width: '12px',
                margin: '0 5px',
                height: '12px',
                border: '1px solid #2A559C',
                color: 'transparent',
              },
            }}
          >
            {data.map((item: any) => (
              <Stack
                key={item.id}
                sx={{
                  flex: '1',
                  boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  margin: '0 0 0 0',
                }}
              >
                <HotNewsItem data={item} isMobile={isMobile} />
              </Stack>
            ))}
          </Carousel>
        ) : (
          <Stack
            direction="row"
            spacing={3}
            sx={{
              mb: 8,
            }}
          >
            {data.map((item: any) => (
              <Stack
                key={item.id}
                sx={{
                  flex: '1',
                  boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden',

                  borderRadius: '8px',
                }}
              >
                <HotNewsItem data={item} />
              </Stack>
            ))}
          </Stack>
        )}
        <Box sx={{ position: 'relative', width: '100%', height: isMobile ? 2 : 1 }}>
          <Image
            src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/horizontal_fbc812674b.png?updated_at=2022-08-25T09:27:30.260Z"
            alt="Horizontal icon"
            fill
            sizes="100vw"
            style={{ objectFit: isMobile ? 'cover' : 'contain' }}
            // KHÔNG dùng priority cùng với loading
          />
        </Box>
      </Container>
    </Box>
  )
}

export default HotNews
