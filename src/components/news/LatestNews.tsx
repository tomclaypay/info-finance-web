import { Box, Container, Divider, Stack, Typography } from '@mui/material'

import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useMobile } from '../common'
import LatestNewsItem from './LatestNews-item'
import LatestNewsItemRow from './LatestNews-item-row'
interface LatestNewsProps {
  data: any
  home?: boolean
}

const LatestNews = ({ data, home = false }: LatestNewsProps) => {
  const { t } = useTranslation('common')
  const isMobile = useMobile()
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        py: isMobile ? 1 : 5,
      }}
    >
      {home ? (
        isMobile ? (
          <Stack divider={<Divider orientation="horizontal" flexItem sx={{ mt: 1, mb: 2 }} />}>
            {data.slice(0, 3).map((item: any, index: number) => (
              <LatestNewsItem key={index} data={item} />
            ))}
          </Stack>
        ) : (
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 2 }} />}>
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: '1',
              }}
            >
              {data?.[1] && <LatestNewsItem data={data[1]} />}
              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[2] && <LatestNewsItem data={data[2]} image={false} />}
              </Stack>
            </Stack>

            <Stack sx={{ flex: '2' }}>{data?.[0] && <LatestNewsItem data={data[0]} highlight={true} />}</Stack>

            <Stack
              sx={{
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flex: '1',
              }}
            >
              {data?.[3] && <LatestNewsItem data={data[3]} image={false} />}

              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[4] && <LatestNewsItem data={data[4]} image={false} />}
              </Stack>
              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[5] && <LatestNewsItem data={data[5]} image={false} />}
              </Stack>
            </Stack>
          </Stack>
        )
      ) : isMobile ? (
        <Stack px={2} spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                width: 12,
                height: 24,
                borderRadius: '8px',
              }}
            />
            <Typography variant="h1">{t('news.latest')}</Typography>
          </Stack>
          {data?.[0] && <LatestNewsItem data={data[0]} highlight={true} />}
          <Divider orientation="horizontal" />
          {data?.[1] && <LatestNewsItemRow data={data[1]} />}
          <Divider />
          <Stack divider={<Divider orientation="horizontal" flexItem sx={{ mt: 1, mb: 2 }} />}>
            {data?.slice(2, 5).map((item: any, index: number) => (
              <LatestNewsItem key={index} data={item} image={false} />
            ))}
          </Stack>
          <Box sx={{ position: 'relative', width: '100%', height: 2, mt: 1 }}>
            <Image
              src={
                'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/horizontal_fbc812674b.png?updated_at=2022-08-25T09:27:30.260Z'
              }
              alt="Horizontal icon"
              sizes="100vw"
              layout="responsive"
              objectFit="cover"
              loading="lazy"
            />
          </Box>
        </Stack>
      ) : (
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Image
              src={
                'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
              }
              alt="icon"
              width={12}
              height={24}
              loading="lazy"
            />
            <Typography variant="h1" sx={{ flex: '1', ml: 2 }}>
              {t('news.latest')}
            </Typography>
            {/* <NextLink href="/news" passHref>
              <Link
                sx={{
                  color: 'primary.main',
                  marginRight: '5px',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="button" sx={{ mr: 1 }}>
                  {t('news.moreLatest')}
                </Typography>
                <Image
                  src={
                    'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Arrow_Right_18e705d65a.png?updated_at=2022-08-25T09:28:40.108Z'
                  }
                  alt="icon"
                  width={24}
                  height={24}
                />
              </Link>
            </NextLink> */}
          </Box>

          <Stack
            direction="row"
            sx={{
              mb: 8,
            }}
            divider={<Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 2 }} />}
          >
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: '1',
              }}
            >
              {data?.[1] && <LatestNewsItem data={data[1]} />}

              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[2] && <LatestNewsItem data={data[2]} image={false} />}
              </Stack>
            </Stack>

            <Stack sx={{ flex: '2' }}>{data?.[0] && <LatestNewsItem data={data[0]} highlight={true} />}</Stack>

            <Stack
              sx={{
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flex: '1',
              }}
            >
              {data?.[3] && <LatestNewsItem data={data[3]} image={false} />}

              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[4] && <LatestNewsItem data={data[4]} image={false} />}
              </Stack>
              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[5] && <LatestNewsItem data={data[5]} image={false} />}
              </Stack>
            </Stack>
          </Stack>
          <Box sx={{ position: 'relative', width: '100%', height: 1 }}>
            <Image
              src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/horizontal_fbc812674b.png?updated_at=2022-08-25T09:27:30.260Z"
              alt="Horizontal icon"
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              loading="lazy"
            />
          </Box>
        </Container>
      )}
    </Box>
  )
}

export default LatestNews
