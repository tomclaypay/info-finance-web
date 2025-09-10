import { Box, Link, Typography, Stack } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import { format, formatDistanceToNow } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { NEWS_CATEGORIES, NEWS_CATEGORIES_COLOR } from '@app/constants/news'
import { useRouter } from 'next/router'
import { useMobile } from '../common'

interface LatestNewsItemProps {
  data: any
  image?: boolean
  highlight?: boolean
}

const LatestKnowledgeItem = ({ data, image = true, highlight = false }: LatestNewsItemProps) => {
  const dataArticle = data?.attributes
  const { locale } = useRouter()
  const isMobile = useMobile()

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {image ? (
        <Box
          sx={{
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
            height: isMobile ? '288px' : '100%',
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

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: image ? 2 : null,
          clear: 'both',
          py: 0.75,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: NEWS_CATEGORIES_COLOR[dataArticle?.articleCategories?.data?.attributes?.slug as NEWS_CATEGORIES],
            mr: 1,
          }}
        >
          {dataArticle?.articleCategories?.data?.attributes.name}
        </Typography>
        <Image
          src={
            'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blur_485642392c.png?updated_at=2022-08-25T09:27:29.672Z'
          }
          alt="icon"
          width={6}
          height={7}
          loading="lazy"
        />
        <Typography
          variant="body2"
          sx={{
            color: 'subtitle.main',
            ml: 1,
            clear: 'both',
            maxWidth: '160px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {highlight
            ? locale === 'vi'
              ? formatDistanceToNow(new Date(dataArticle?.publishedTime), { locale: viLocale, addSuffix: true })
              : formatDistanceToNow(new Date(dataArticle?.publishedTime), { addSuffix: true })
            : locale === 'vi'
            ? format(new Date(dataArticle?.publishedTime), "dd 'tháng' L uuuu", {
                locale: viLocale,
              })
            : format(new Date(dataArticle?.publishedTime), 'd MMM uuuu')}
        </Typography>
      </Box>

      <NextLink href={`/${locale === 'vi' ? 'kien-thuc' : 'knowledge'}/${dataArticle?.slug}`} passHref>
        <Link>
          <Typography
            variant="h3"
            sx={{
              height: '100%',
              color: 'text.main',
              textWrap: 'wrap',
              WebkitLineClamp: 3,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              '&:hover': {
                color: NEWS_CATEGORIES_COLOR[dataArticle?.articleCategories?.data?.attributes?.slug as NEWS_CATEGORIES],
              },
            }}
          >
            {dataArticle?.title}
          </Typography>
        </Link>
      </NextLink>
    </Stack>
  )
}

export default LatestKnowledgeItem
