import { Link, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import Image from 'next/image'
import React from 'react'
import HomeSliderNews from './HomeSliderNews'
import { useMobile } from '../common'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

const HomeSliderHotNews = ({ dataPinArticles }: any) => {
  const isMobile = useMobile()
  const { t } = useTranslation('common')
  return (
    <Box
      sx={{
        mt: 2,
        backgroundColor: 'background.paper',
        pt: isMobile ? 2 : 0,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', width: '100%', height: isMobile ? 2 : 1 }}>
          <Image
            src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/horizontal_fbc812674b.png?updated_at=2022-08-25T09:27:30.260Z"
            alt="Horizontal icon"
            fill
            sizes="100vw"
            style={{ objectFit: isMobile ? 'cover' : 'contain' }}
            loading="lazy"
          />
        </Box>
        <Stack py={5}>
          <Typography variant="h2" sx={{ flex: '1', mb: 3 }}>
            {t('news.hot')}
          </Typography>
          <HomeSliderNews data={dataPinArticles} />
          <Box
            width={'100%'}
            sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', marginTop: '20px' }}
          >
            <Link
              component={NextLink}
              href="/news"
              passHref
              sx={{
                color: 'primary.main',
                marginRight: '5px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="button" sx={{ mr: 1 }}>
                {t('text.seeMore', { ns: 'common' })}
              </Typography>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
                }
                alt="icon"
                width={24}
                height={24}
                loading="lazy"
              />
            </Link>
          </Box>
        </Stack>
        <Box sx={{ position: 'relative', width: '100%', height: isMobile ? 2 : 1 }}>
          <Image
            src={
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/horizontal_fbc812674b.png?updated_at=2022-08-25T09:27:30.260Z'
            }
            alt="Horizontal icon"
            fill
            sizes="100vw"
            style={{ objectFit: isMobile ? 'cover' : 'contain' }}
            loading="lazy"
          />
        </Box>
      </Container>
    </Box>
  )
}

export default HomeSliderHotNews
