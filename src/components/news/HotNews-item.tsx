import { Box, Link, Typography, Stack } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { NEWS_CATEGORIES, NEWS_CATEGORIES_COLOR } from '@app/constants/news'
import { useRouter } from 'next/router'
import viLocale from 'date-fns/locale/vi'
interface HotNewsItemProps {
  data: any
  isMobile?: boolean
}

const HotNewsItem = ({ data, isMobile }: HotNewsItemProps) => {
  const { locale } = useRouter()
  return (
    <Stack sx={{}}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: isMobile ? '45.25%' : '56.25%',
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
          src={data?.attributes?.thumbnail?.data?.attributes?.url}
          alt="icon"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
          loading="lazy"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          padding: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              color:
                NEWS_CATEGORIES_COLOR[data?.attributes.articleCategories.data?.attributes?.slug as NEWS_CATEGORIES],
              mr: 1,
            }}
          >
            {data?.attributes?.articleCategories?.data?.attributes?.name}
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
              maxWidth: '160px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              clear: 'both',
            }}
          >
            {locale === 'vi'
              ? format(new Date(data?.attributes.publishedTime), "dd 'tháng' L uuuu", {
                  locale: viLocale,
                })
              : format(new Date(data?.attributes.publishedTime), 'd MMM uuuu')}
          </Typography>
        </Box>

        <NextLink href={`/${locale === 'vi' ? 'tin-tuc' : 'news'}/${data?.attributes?.slug}`} passHref>
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
                    NEWS_CATEGORIES_COLOR[data?.attributes.articleCategories.data?.attributes?.slug as NEWS_CATEGORIES],
                },
                height: isMobile ? '100px' : 'none',
              }}
            >
              {data?.attributes.title}
            </Typography>
          </Link>
        </NextLink>
      </Box>
    </Stack>
  )
}

export default HotNewsItem
