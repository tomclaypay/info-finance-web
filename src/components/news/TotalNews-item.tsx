import { Box, Link, Typography, Card, CardActionArea, CardMedia, CardContent, useTheme } from '@mui/material'
import NextLink from 'next/link'

import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { useRouter } from 'next/router'

type ItemSize = 'small' | 'medium'
interface CategoryNewsItemProps {
  data: any
  size?: ItemSize
}

const TotalNewsItem = ({ data, size = 'medium' }: CategoryNewsItemProps) => {
  const dataArticle = data?.attributes
  const theme = useTheme()
  const { locale } = useRouter()

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '8px',
        backgroundColor: theme.palette.common.white,
        boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.05)',
      }}
      elevation={2}
    >
      <NextLink href={`/${locale === 'vi' ? 'tin-tuc' : 'news'}/${dataArticle.slug}`} passHref>
        <Link>
          <CardActionArea
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'stretch',
              borderRadius: '8px',
            }}
          >
            <CardMedia
              sx={{
                width: size === 'medium' ? '300px' : '120px',
                height: size === 'medium' ? '150px' : '92px',
              }}
              component="img"
              src={dataArticle.thumbnail.data?.attributes.url}
              alt="icon"
            />
            <CardContent
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                ml: 1,
                padding: size === 'medium' ? theme.spacing(1) : theme.spacing(0.5),
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.h5.fontWeight,
                  fontSize: size === 'medium' ? '18px' : '14px',
                  WebkitLineClamp: 1,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {dataArticle.title}
              </Typography>

              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: size === 'medium' ? theme.typography.body2.fontSize : '12px',
                  fontWeight: 500,
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {dataArticle.description}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: size === 'medium' ? theme.typography.body2.fontSize : theme.typography.caption.fontSize,
                }}
              >
                <Box component="span" color="text.secondary" whiteSpace="pre-wrap">
                  {locale === 'vi'
                    ? format(new Date(dataArticle.publishedTime), "HH:mm・ dd 'tháng' L uuuu", {
                        locale: viLocale,
                      })
                    : format(new Date(dataArticle.publishedTime), 'HH:mm・ d MMM uuuu')}
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Link>
      </NextLink>
    </Card>
  )
}

export default TotalNewsItem
