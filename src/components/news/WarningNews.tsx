import { Box, Container, Divider, Stack, Typography } from '@mui/material'

import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useMobile } from '../common'
import CategoryNewsItem from './CategoryNews-item'
import { useRouter } from 'next/router'
interface WarningNewsProps {
  data: any
  owner?: boolean
  home?: boolean
  slug?: string
  detail?: boolean
  handleChangeTab?: (newValue: string) => void
}

const WarningNews = ({ data, owner, home, slug, handleChangeTab, detail }: WarningNewsProps) => {
  const { t } = useTranslation('common')
  const isMobile = useMobile()
  const router = useRouter()
  const handleClick = () => {
    if (detail) {
      router.push({
        pathname: `/news/category/${slug}`,
      })
    }
    if (handleChangeTab) {
      handleChangeTab('warning')
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: home || owner ? 'background.paper' : '#f9f9f9',
        py: isMobile ? 1 : 5,
      }}
    >
      {home &&
        (isMobile ? (
          <Stack divider={<Divider orientation="horizontal" flexItem sx={{ mt: 1, mb: 2 }} />}>
            {data.slice(0, 3).map((item: any, index: number) => (
              <CategoryNewsItem data={item} key={index} />
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
              {data?.[1] && <CategoryNewsItem data={data[1]} />}
              <Stack sx={{ mt: 4 }}>
                <Divider sx={{ mb: 2 }} />
                {data?.[2] && <CategoryNewsItem data={data[2]} />}
              </Stack>
            </Stack>

            <Stack
              sx={{
                flex: '2',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {data?.[0] && <CategoryNewsItem data={data[0]} highlight={true} />}
              <Stack sx={{ width: '100%' }}>
                <Divider sx={{ mb: 2 }} />
                {data?.[3] && <CategoryNewsItem data={data[3]} horizontal={true} />}
              </Stack>
            </Stack>

            <Stack
              sx={{
                flex: '1',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              {data?.[4] && <CategoryNewsItem data={data[4]} image={false} />}
              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[5] && <CategoryNewsItem data={data[5]} image={false} />}
              </Stack>
              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[6] && <CategoryNewsItem data={data[6]} image={false} />}
              </Stack>
              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[7] && <CategoryNewsItem data={data[7]} image={false} />}
              </Stack>
            </Stack>
          </Stack>
        ))}
      {!home &&
        (isMobile ? (
          <Stack px={2} spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1} justifyContent={detail ? 'center' : 'flex-start'}>
              {!detail && (
                <Box
                  sx={{
                    backgroundColor: 'secondary.main',
                    width: 12,
                    height: 24,
                    borderRadius: '8px',
                  }}
                />
              )}
              <Typography variant="h2" textAlign="center" mb={1}>
                {t('news.warning')}
              </Typography>
            </Stack>

            {data?.[0] && <CategoryNewsItem data={data[0]} highlight={true} />}
            <Divider />
            <Stack divider={<Divider flexItem sx={{ my: 2 }} />}>
              {data?.slice(1, 4).map((item: any) => (
                <CategoryNewsItem key={item.id} data={item} horizontal={true} isMobile={isMobile} />
              ))}
            </Stack>
            <Stack
              direction="row"
              sx={{
                color: 'primary.main',
                marginRight: '5px',
                fontSize: '1rem',
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
              }}
              onClick={() => handleClick()}
            >
              <Typography variant="button" sx={{ mr: 1 }}>
                {t('news.moreWarning')}
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
            </Stack>
          </Stack>
        ) : (
          <Container maxWidth="lg">
            {!owner ? (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Image
                  src={
                    'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Yellow_67c6724d95.png?updated_at=2022-08-25T09:27:29.671Z'
                  }
                  alt="icon"
                  width={12}
                  height={24}
                  loading="lazy"
                />
                <Typography variant="h2" sx={{ flex: '1', ml: 2 }}>
                  {t('news.warning')}
                </Typography>

                <Stack
                  direction="row"
                  sx={{
                    color: 'primary.main',
                    marginRight: '5px',
                    fontSize: '1rem',
                    display: 'flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                  }}
                  onClick={() => handleClick()}
                >
                  <Typography variant="button" sx={{ mr: 1 }}>
                    {t('news.moreWarning')}
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
                </Stack>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h1" sx={{ marginTop: '-10px' }}>
                  {t('news.warning')}
                </Typography>
              </Box>
            )}

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
                {data?.[1] && <CategoryNewsItem data={data[1]} />}
                <Stack sx={{ mt: 4 }}>
                  <Divider sx={{ mb: 2 }} />
                  {data?.[2] && <CategoryNewsItem data={data[2]} />}
                </Stack>
              </Stack>

              <Stack
                sx={{
                  flex: '2',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {data?.[0] && <CategoryNewsItem data={data[0]} highlight={true} />}
                <Stack sx={{ width: '100%' }}>
                  <Divider sx={{ mb: 2 }} />
                  {data?.[3] && <CategoryNewsItem data={data[3]} horizontal={true} />}
                </Stack>
              </Stack>

              <Stack
                sx={{
                  flex: '1',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                {data?.[4] && <CategoryNewsItem data={data[4]} image={false} />}
                <Stack>
                  <Divider sx={{ mb: 2 }} />
                  {data?.[5] && <CategoryNewsItem data={data[5]} image={false} />}
                </Stack>
                <Stack>
                  <Divider sx={{ mb: 2 }} />
                  {data?.[6] && <CategoryNewsItem data={data[6]} image={false} />}
                </Stack>
                <Stack>
                  <Divider sx={{ mb: 2 }} />
                  {data?.[7] && <CategoryNewsItem data={data[7]} image={false} />}
                </Stack>
              </Stack>
            </Stack>
          </Container>
        ))}
    </Box>
  )
}

export default WarningNews
