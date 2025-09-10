import { Box, Link, Typography, Stack } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import { format, formatDistanceToNow } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { NEWS_CATEGORIES, NEWS_CATEGORIES_COLOR } from '@app/constants/news'
import { useRouter } from 'next/router'

interface LatestNewsItemRowProps {
  data: any
  image?: boolean
  highlight?: boolean
}

const LatestNewsItemRow = ({ data, image = true, highlight = false }: LatestNewsItemRowProps) => {
  const dataArticle = data?.attributes
  const { locale } = useRouter()
  return (
    <Stack direction="row" spacing={2} height={'100%'}>
      {image ? (
        <Box
          sx={{
            flex: '1',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            // paddingTop: '45.25%',
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
            src={dataArticle?.thumbnail?.data?.attributes.url}
            alt="icon"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
            loading="lazy"
          />
        </Box>
      ) : null}
      <Stack sx={{ flex: '3' }} spacing={1}>
        <Typography
          variant="subtitle2"
          sx={{
            color: NEWS_CATEGORIES_COLOR[dataArticle?.articleCategories?.data?.attributes?.slug as NEWS_CATEGORIES],
          }}
        >
          {dataArticle?.articleCategories?.data?.attributes?.name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
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
                WebkitLineClamp: 2,
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                '&:hover': {
                  color:
                    NEWS_CATEGORIES_COLOR[dataArticle.articleCategories?.data?.attributes?.slug as NEWS_CATEGORIES],
                },
              }}
            >
              {dataArticle.title}
            </Typography>
          </Link>
        </NextLink>
      </Stack>
    </Stack>
  )
}

export default LatestNewsItemRow
