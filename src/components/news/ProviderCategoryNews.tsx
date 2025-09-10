import { articleCategorySlugType, getSlugs } from '@app/pages/news'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMobile } from '../common'
import CategoryNewsItem from './CategoryNews-item'

interface ExchangesNewsProps {
  data: any
  owner?: boolean
  home?: boolean
  slug?: string
  title?: string
  newsCategorySlug?: string
  detail?: boolean
  handleChangeTab?: (newValue: string) => void
}

const ProviderCategoryNews = ({
  data,
  owner,
  home,
  slug,
  title,
  newsCategorySlug,
  handleChangeTab,
  detail,
}: ExchangesNewsProps) => {
  const isMobile = useMobile()
  const { t } = useTranslation()
  const router = useRouter()

  const handleClickMoveOn = () => {
    if (detail) {
      router.push({
        pathname: `/news/category/${newsCategorySlug}`,
      })
    } else {
      if (handleChangeTab) {
        switch (slug) {
          case getSlugs(articleCategorySlugType.world, router?.locale as string):
            handleChangeTab(articleCategorySlugType.world)
            break
          case getSlugs(articleCategorySlugType.mart, router?.locale as string):
            handleChangeTab(articleCategorySlugType.mart)
            break
          case getSlugs(articleCategorySlugType.warning, router?.locale as string):
            handleChangeTab(articleCategorySlugType.warning)
            break
          case getSlugs(articleCategorySlugType.domestic, router?.locale as string):
            handleChangeTab(articleCategorySlugType.domestic)
            break
          case getSlugs(articleCategorySlugType.other, router?.locale as string):
            handleChangeTab(articleCategorySlugType.other)
            break
          default:
            break
        }
      }
    }
  }

  const generateSeeMore = () => {
    switch (newsCategorySlug) {
      case getSlugs(articleCategorySlugType.world, router?.locale as string):
        return t('news.moreWorld')
      case getSlugs(articleCategorySlugType.mart, router?.locale as string):
        return t('news.moreMarket')
      case getSlugs(articleCategorySlugType.warning, router?.locale as string):
        return t('news.moreWarning')
      case getSlugs(articleCategorySlugType.domestic, router?.locale as string):
        return t('news.moreDomestic')
      case getSlugs(articleCategorySlugType.other, router?.locale as string):
        return t('news.moreOther')
      default:
        return ''
    }
  }

  const generateTitle = () => {
    switch (newsCategorySlug) {
      case getSlugs(articleCategorySlugType.world, router?.locale as string):
        return t('news.categories.t4')
      case getSlugs(articleCategorySlugType.mart, router?.locale as string):
        return t('news.categories.t2')
      case getSlugs(articleCategorySlugType.warning, router?.locale as string):
        return t('news.categories.t3')
      case getSlugs(articleCategorySlugType.domestic, router?.locale as string):
        return t('news.categories.t5')
      case getSlugs(articleCategorySlugType.other, router?.locale as string):
        return t('news.categories.t6')
      default:
        return ''
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        py: isMobile ? 1 : 5,
      }}
    >
      {home ? (
        isMobile ? (
          <Stack divider={<Divider flexItem sx={{ mt: 1, mb: 2 }} />}>
            {data.slice(0, 3).map((item: any, index: number) => (
              <CategoryNewsItem key={index} data={item} />
            ))}
          </Stack>
        ) : (
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 2 }} />}>
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: '2',
              }}
            >
              {data?.[0] && <CategoryNewsItem data={data[0]} highlight={true} />}
              <Stack sx={{ mt: 4, width: '100%' }}>
                <Divider sx={{ mb: 2 }} />
                {data?.[1] && <CategoryNewsItem data={data[1]} horizontal={true} />}
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
        )
      ) : isMobile ? (
        <Stack p={2} pt={0} spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1} justifyContent={detail ? 'center' : 'flex-start'}>
            {!detail && (
              <Box
                sx={{
                  backgroundColor: '#3B71FE',
                  width: 12,
                  height: 24,
                  borderRadius: '8px',
                }}
              />
            )}
            <Typography variant="h2" textAlign="center" mb={1}>
              {title}
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
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleClickMoveOn}
          >
            <Typography variant="button" sx={{ mr: 1 }}>
              {generateSeeMore()}
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
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_mart_9026088f82.png?updated_at=2022-08-25T09:27:29.699Z'
                }
                alt="icon"
                width={12}
                height={24}
                loading="lazy"
              />
              <Typography variant="h2" sx={{ flex: '1', ml: 2 }}>
                {title}
              </Typography>
              <Stack
                direction="row"
                sx={{
                  color: 'primary.main',
                  marginRight: '5px',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleClickMoveOn}
              >
                <Typography variant="button" sx={{ mr: 1 }}>
                  {generateSeeMore()}
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
              <Typography variant="h2" textAlign="center" mb={1}>
                {generateTitle()}
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
              {data?.[0] && <CategoryNewsItem data={data[0]} highlight={true} />}
              <Stack sx={{ mt: 4, width: '100%' }}>
                <Divider sx={{ mb: 2 }} />
                {data?.[1] && <CategoryNewsItem data={data[1]} horizontal={true} />}
              </Stack>
            </Stack>
            <Stack
              sx={{
                flex: '1',
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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

export default ProviderCategoryNews
