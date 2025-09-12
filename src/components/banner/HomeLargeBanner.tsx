import useBanner, { BannerPosition } from '@app/hooks/useBanner'
import { Box, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useMobile } from '../common'
import { useTranslation } from 'react-i18next'
import { Banner } from '@app/operations/queries/banners/home-banners'

const HomeLargeBanner = ({ dataBanner }: { dataBanner: Banner[] }) => {
  const isMobile = useMobile()
  const { t } = useTranslation(['home-page'])
  if (!dataBanner || dataBanner.length === 0) {
    return null
  }
  return (
    <Container
      sx={{
        objectFit: 'contain',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontWeight: 600, marginBottom: '12px' }}>
          {t('cooperate')}
        </Typography>
      </Box>
      <Grid container justifyContent="center" mb={8} spacing={[4, 2]} alignItems="center">
        {dataBanner[0]?.link?.map((url: string, index: number) => (
          <Grid item key={index} md={4} sm={4} xs={12} justifyContent="center">
            <a
              href={dataBanner[0]?.url?.[index] ?? '#'}
              target="_blank"
              rel="nofollow noreferrer"
              style={{ display: 'block', width: '100%' }}
            >
              <Box
                position="relative"
                height={0}
                paddingBottom={'56.25%'}
                borderRadius="8px"
                overflow="hidden"
                mx={'auto'}
              >
                <Image
                  alt="banner"
                  layout="fill"
                  src={url}
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  loading="lazy"
                />
              </Box>
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HomeLargeBanner
