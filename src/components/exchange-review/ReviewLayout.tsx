import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import GridViewIcon from '@mui/icons-material/GridView'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { Box, Button, CircularProgress, Container, Divider, Link, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import GET_COMPLAINT_CATEGORIES from '@app/operations/queries/complaints/get-complaint-categories'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDesktop, useMobile } from '../common'
import { mappedReviewCategorySlug, mappedReviewCategorySlugByLocale } from '@app/utils/common'

const ReviewLayout = (props: any) => {
  const { t } = useTranslation('complaints')
  const isMobile = useMobile()
  const isDesktop = useDesktop()

  const { children } = props
  const router = useRouter()
  const { reviewCategorySlug } = router.query
  const { locale } = router
  const mapReviewCategorySlug = mappedReviewCategorySlug(reviewCategorySlug as string)

  const { loading, data } = useQuery(GET_COMPLAINT_CATEGORIES)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 600) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 300,
      behavior: 'smooth', // for smoothly scrolling
    })
  }

  const conditionsRenderLayout =
    data?.complaint_categories?.find((item: any) => item.slug === mapReviewCategorySlug) ||
    mapReviewCategorySlug === undefined

  if (conditionsRenderLayout) {
    return !isDesktop ? (
      <Stack>
        {/* <Typography
          my={2}
          textAlign="center"
          variant={mapReviewCategorySlug === undefined ? 'h1' : 'h2'}
          sx={{ color: 'text.main' }}
        >
          {t(`yourComplaint.left.infoExchange.t2`)}
        </Typography> */}
        {children}
      </Stack>
    ) : (
      <Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            pt: isMobile ? 2 : 10,
          }}
        >
          <Container maxWidth="lg">
            {/* <Stack direction="row" gap={1}>
              <Image
                src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z"
                alt="icon"
                width={12}
                height={25}
              />
              <Typography
                textAlign={isMobile ? 'center' : 'left'}
                sx={{ color: 'text.main' }}
                fontSize={20}
                fontWeight={600}
                lineHeight="24px"
                variant={mapReviewCategorySlug === undefined ? 'h1' : 'h2'}
              >
                {t(`yourComplaint.left.infoExchange.t2`)}
              </Typography>
            </Stack> */}
            <Stack direction="row" sx={{ mt: 3 }} spacing={1}>
              {loading && (
                <Stack alignItems="center" justifyContent="center">
                  <CircularProgress />
                </Stack>
              )}

              <NextLink href={`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}`} passHref>
                <Button
                  variant="text"
                  sx={{
                    flex: '1',
                    backgroundColor: mapReviewCategorySlug === undefined ? '#F4F8FF' : 'transparent',
                    borderRadius: '12px',
                    padding: '12px 16px ',
                    '&:hover': {
                      backgroundColor: '#F4F8FF',
                      borderColor: 'transparent',
                    },
                  }}
                >
                  <Link
                    sx={{
                      color: mapReviewCategorySlug === undefined ? 'unactive' : 'primary',
                    }}
                  >
                    <Typography
                      sx={{
                        ml: 1,
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                        fontSize: '1rem !important',
                        fontWeight: 'medium',
                        color: mapReviewCategorySlug === undefined ? 'primary.main' : 'unactive.main',
                      }}
                    >
                      <GridViewIcon
                        sx={{
                          color: mapReviewCategorySlug === undefined ? 'primary.main' : 'unactive.main',
                        }}
                      />
                      {router.locale === 'vi' ? 'Tất cả' : 'All'}
                    </Typography>
                  </Link>
                </Button>
              </NextLink>
              {data &&
                data?.complaint_categories.map((item: any) => {
                  const mapSlug = mappedReviewCategorySlugByLocale(item.slug, locale as string)
                  return (
                    <NextLink
                      key={item.id}
                      href={`/${locale === 'vi' ? 'danh-gia-san' : 'exchange-review'}/${mapSlug}`}
                      passHref
                    >
                      <Button
                        variant="text"
                        sx={{
                          flex: '1',
                          backgroundColor: mapReviewCategorySlug === item.slug ? '#F4F8FF' : 'transparent',
                          borderRadius: '12px',
                          padding: '12px 16px ',
                          '&:hover': {
                            backgroundColor: '#F4F8FF',
                            borderColor: 'transparent',
                          },
                        }}
                      >
                        <Link
                          sx={{
                            color: mapReviewCategorySlug === item.slug ? 'unactive' : 'primary',
                          }}
                        >
                          {mapSlug === (locale === 'vi' ? 'lua-dao' : 'scam') && (
                            <>
                              <Typography
                                variant={mapReviewCategorySlug === ('lua-dao' || 'scam') ? 'h1' : 'h2'}
                                fontSize={1}
                                sx={{
                                  ml: 1,
                                  display: 'flex',
                                  gap: 1,
                                  alignItems: 'center',
                                  fontSize: '1rem !important',
                                  fontWeight: 'medium',
                                  color: mapReviewCategorySlug === item.slug ? 'primary.main' : 'unactive.main',
                                }}
                              >
                                <WarningAmberRoundedIcon
                                  // color={reviewCategorySlug === item.slug ? 'primary' : 'unactive'}
                                  sx={{
                                    color: mapReviewCategorySlug === item.slug ? 'primary.main' : 'unactive.main',
                                  }}
                                />
                                {router.locale === 'vi' ? 'Lừa đảo' : 'Scam'}
                              </Typography>
                            </>
                          )}

                          {mapSlug ===
                            (locale === 'vi'
                              ? 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu'
                              : 'investor-feedback-and-comments-mailbox') && (
                            <>
                              <Typography
                                sx={{
                                  ml: 1,
                                  display: 'flex',
                                  gap: 1,
                                  alignItems: 'center',
                                  fontSize: '1rem !important',
                                  fontWeight: 'medium',
                                  color: mapReviewCategorySlug === item.slug ? 'primary.main' : 'unactive.main',
                                }}
                                variant={
                                  mapReviewCategorySlug ===
                                  ('hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu' ||
                                    'investor-feedback-and-comments-mailbox')
                                    ? 'h1'
                                    : 'h2'
                                }
                              >
                                <MonetizationOnOutlinedIcon
                                  // color={reviewCategorySlug === item.slug ? 'primary' : 'unactive'}
                                  sx={{
                                    color: mapReviewCategorySlug === item.slug ? 'primary.main' : 'unactive.main',
                                  }}
                                />
                                {router.locale === 'vi'
                                  ? 'Hộp thư đánh giá và góp ý từ nhà đầu tư'
                                  : 'Investor feedback and comments mailbox'}
                              </Typography>
                            </>
                          )}

                          {mapSlug === (locale === 'vi' ? 'danh-gia-tong-quat' : 'general-review') && (
                            <>
                              <Typography
                                sx={{
                                  ml: 1,
                                  display: 'flex',
                                  gap: 1,
                                  alignItems: 'center',
                                  fontSize: '1rem !important',
                                  fontWeight: 'medium',
                                  color: mapReviewCategorySlug === item.slug ? 'primary.main' : 'unactive.main',
                                }}
                                variant={
                                  mapReviewCategorySlug === ('danh-gia-tong-quat' || 'general-review') ? 'h1' : 'h2'
                                }
                              >
                                <TrendingUpIcon
                                  sx={{
                                    color: mapReviewCategorySlug === item.slug ? 'primary.main' : 'unactive.main',
                                  }}
                                  // color={reviewCategorySlug === item.slug ? 'primary' : 'unactive'}
                                />
                                {router.locale === 'vi' ? 'Đánh giá tổng quát' : 'General Review'}
                              </Typography>
                            </>
                          )}

                          {mapSlug === (locale === 'vi' ? 'ly-do-khac' : 'other-problems') && (
                            <>
                              <Typography
                                sx={{
                                  ml: 1,
                                  display: 'flex',
                                  gap: 1,
                                  alignItems: 'center',
                                  fontSize: '1rem !important',
                                  fontWeight: 'medium',
                                  color: mapReviewCategorySlug === item.slug ? 'primary.main' : 'unactive.main',
                                }}
                                variant={mapReviewCategorySlug === 'ly-do-khac' ? 'h1' : 'h2'}
                              >
                                <FormatListBulletedRoundedIcon
                                  sx={{
                                    color: mapReviewCategorySlug === item.slug ? 'primary.main' : 'unactive.main',
                                  }}
                                  // color={reviewCategorySlug === item.slug ? 'primary' : 'unactive'}
                                />
                                {router.locale === 'vi' ? 'Lý do khác' : 'Other problems'}
                              </Typography>
                            </>
                          )}
                        </Link>
                      </Button>
                    </NextLink>
                  )
                })}
            </Stack>
            <Divider sx={{ mt: 3, mb: 5, borderColor: '#d0d0d0' }} />
          </Container>
        </Box>

        {showButton && (
          <ArrowCircleUpOutlinedIcon
            sx={{ color: 'black', cursor: 'pointer', position: 'fixed', bottom: '30px', right: '30px' }}
            fontSize="large"
            onClick={scrollToTop}
          />
        )}
        {children}
      </Box>
    )
  } else return <>{children}</>
}

export default ReviewLayout
