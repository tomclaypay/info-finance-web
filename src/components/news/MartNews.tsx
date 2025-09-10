import { Box, Divider, Link, Stack, Typography, Container } from '@mui/material'
import NextLink from 'next/link'

import Image from 'next/image'
import CategoryNewsItem from './CategoryNews-item'
interface MartNewsProps {
  data: any
  owner?: boolean
  home?: boolean
  slug?: string
}

const MartNews = ({ data, owner = false, home = false }: MartNewsProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: 5,
        pb: 5,
      }}
    >
      {home ? (
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 2 }} />}>
          <Stack
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: '2',
            }}
          >
            {data?.[1] && <CategoryNewsItem data={data[1]} />}
            <Stack sx={{ mt: 4, width: '100%' }}>
              <Divider sx={{ mb: 2 }} />
              {data?.[0] && <CategoryNewsItem data={data[0]} horizontal={true} />}
            </Stack>
          </Stack>

          <Stack
            sx={{
              flex: '1',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {data?.[2] && <CategoryNewsItem data={data[2]} />}
            <Stack>
              <Divider sx={{ mb: 2 }} />
              {data?.[3] && <CategoryNewsItem data={data[3]} />}
            </Stack>
          </Stack>

          <Stack
            sx={{
              flex: '1',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {data?.[4] && <CategoryNewsItem data={data[4]} />}
            <Stack>
              <Divider sx={{ mb: 2 }} />
              {data?.[5] && <CategoryNewsItem data={data[5]} />}
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Container maxWidth="lg">
          {!owner ? (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_mart_9026088f82.png?updated_at=2022-08-25T09:27:29.699Z'
                }
                alt="icon"
                width={12}
                height={24}
                loading="lazy"
              />
              <Typography variant="h2" sx={{ flex: '1', ml: 2 }}>
                Tin tức về thị trường
              </Typography>
              <NextLink href="/news/mart" passHref>
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
                    View more broker’s news
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
              </NextLink>
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
                Tin tức về thị trường
              </Typography>
            </Box>
          )}

          <Stack
            direction="row"
            sx={{
              mb: 5,
            }}
            divider={<Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 2 }} />}
          >
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: '2',
              }}
            >
              {data?.[1] && <CategoryNewsItem data={data[1]} />}
              <Stack sx={{ mt: 4, width: '100%' }}>
                <Divider sx={{ mb: 2 }} />
                {data?.[1] && <CategoryNewsItem data={data[0]} horizontal={true} />}
              </Stack>
            </Stack>

            <Stack
              sx={{
                flex: '1',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {data?.[2] && <CategoryNewsItem data={data[2]} />}
              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[3] && <CategoryNewsItem data={data[3]} />}
              </Stack>
            </Stack>

            <Stack
              sx={{
                flex: '1',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {data?.[4] && <CategoryNewsItem data={data[4]} />}
              <Stack>
                <Divider sx={{ mb: 2 }} />
                {data?.[5] && <CategoryNewsItem data={data[5]} />}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </Box>
  )
}

export default MartNews
