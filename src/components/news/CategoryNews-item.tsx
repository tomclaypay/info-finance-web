import { Box, Link, Typography, Stack } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import viLocale from 'date-fns/locale/vi'
import { format, formatDistanceToNow } from 'date-fns'
import { NEWS_CATEGORIES, NEWS_CATEGORIES_COLOR } from '@app/constants/news'
import { useRouter } from 'next/router'

interface CategoryNewsItemProps {
  data: any
  horizontal?: boolean
  image?: boolean
  highlight?: boolean
  isMobile?: boolean
}

const CategoryNewsItem = ({ data, horizontal, image = true, highlight, isMobile }: CategoryNewsItemProps) => {
  const dataArticle = data?.attributes
  const { locale } = useRouter()

  return (
    <Stack direction={horizontal ? 'row' : 'column'} sx={{ width: '100%' }}>
      {horizontal ? (
        <>
          <Stack sx={{ flex: isMobile ? '2' : '1' }}>
            <Box
              sx={{
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                '& > span': {
                  position: 'absolute!important',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
              }}
            >
              <Image
                src={dataArticle?.thumbnail?.data?.attributes?.url}
                alt="icon"
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                loading="lazy"
              />
            </Box>
          </Stack>
          <Stack sx={{ flex: '2', pl: 2, pt: 1 }}>
            <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
              {locale === 'vi'
                ? format(new Date(dataArticle.publishedTime), "dd 'tháng' L uuuu", {
                    locale: viLocale,
                  })
                : format(new Date(dataArticle.publishedTime), 'd MMM uuuu')}
            </Typography>
            <NextLink href={`/${locale === 'vi' ? 'tin-tuc' : 'news'}/${dataArticle.slug}`} passHref>
              <Link>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'text.main',
                    textWrap: 'wrap',
                    WebkitLineClamp: 3,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    mt: 1,
                    '&:hover': {
                      color:
                        NEWS_CATEGORIES_COLOR[
                          dataArticle?.articleCategories?.data?.attributes?.slug as NEWS_CATEGORIES
                        ],
                    },
                  }}
                >
                  {dataArticle.title}
                </Typography>
              </Link>
            </NextLink>
          </Stack>
        </>
      ) : (
        <>
          {image ? (
            <Box
              sx={{
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                '& > span': {
                  position: 'absolute!important',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
              }}
            >
              <Image
                src={dataArticle?.thumbnail?.data?.attributes?.url}
                alt="icon"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                loading="lazy"
              />
            </Box>
          ) : null}

          <Typography variant="body2" sx={{ color: 'subtitle.main', mt: image ? 2 : null }}>
            {highlight
              ? locale === 'vi'
                ? formatDistanceToNow(new Date(dataArticle.publishedTime), { locale: viLocale, addSuffix: true })
                : formatDistanceToNow(new Date(dataArticle.publishedTime), { addSuffix: true })
              : locale === 'vi'
              ? format(new Date(dataArticle.publishedTime), "dd 'tháng' L uuuu", {
                  locale: viLocale,
                })
              : format(new Date(dataArticle.publishedTime), 'd MMM uuuu')}
          </Typography>
          <NextLink href={`/${locale === 'vi' ? 'tin-tuc' : 'news'}/${dataArticle.slug}`} passHref>
            <Link>
              <Typography
                variant="h3"
                sx={{
                  color: 'text.main',
                  textWrap: 'wrap',
                  WebkitLineClamp: 3,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  '&:hover': {
                    color:
                      NEWS_CATEGORIES_COLOR[dataArticle?.articleCategories?.data?.attributes?.slug as NEWS_CATEGORIES],
                  },
                }}
              >
                {dataArticle.title}
              </Typography>
            </Link>
          </NextLink>
        </>
      )}
    </Stack>
  )
}

export default CategoryNewsItem
