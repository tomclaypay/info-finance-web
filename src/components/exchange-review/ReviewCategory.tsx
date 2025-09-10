import { Autocomplete, Box, Button, Chip, Container, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { AuthContext } from '@app/contexts/amplify-context'
import { useContext } from 'react'
import CategoryItem from './CategoryItem'
import { useTranslation } from 'next-i18next'
import { useDesktop, useMobile, useTablet } from '../common'
import { Exchange } from '@app/interfaces/exchange'
import { useRouter } from 'next/router'
import ReviewBanner from '@app/components/banner/ReivewBanner'
import Image from 'next/image'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SearchIcon from '@mui/icons-material/Search'

interface ReviewCategoryProps {
  data: any
  description: string
  handleFetchMoreData: () => void
  total: number
  complaintAggregate?: number
  exchangeDataOptions?: Exchange[]
  currentExchanges: Exchange[]
  handleAddCurrentExchange: (event: any, newValue: any) => void
  handleRemoveCurrentExchange: (exchange: Exchange) => void
}

const ReviewCategory = ({
  data,
  description,
  handleFetchMoreData,
  complaintAggregate,
  total,
  exchangeDataOptions,
  currentExchanges,
  handleAddCurrentExchange,
  handleRemoveCurrentExchange,
}: ReviewCategoryProps) => {
  const { t } = useTranslation(['complaints', 'home-page'])
  const value = useContext(AuthContext)
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const isTablet = useTablet()
  const router = useRouter()
  const locale = router.locale
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        padding: '24px 0',
      }}
    >
      <Container maxWidth="lg">
        {isDesktop && (
          <Stack direction="row" spacing={4}>
            <Stack sx={{ width: '66.67%', height: '120vh', overflowY: 'scroll' }}>
              <Stack spacing={3}>
                {data?.map((item: any, index: any) => (
                  <CategoryItem data={item} key={index} />
                ))}
              </Stack>
              {data && data?.length > 0 && total && (
                <Container maxWidth="lg">
                  <Box
                    sx={{
                      width: '100%',
                      pt: 4,
                      display: 'flex',
                      pb: 0,
                      justifyContent: 'center',
                    }}
                  >
                    {data?.length < total && (
                      <Button
                        onClick={() => handleFetchMoreData()}
                        variant="contained"
                        sx={{
                          borderRadius: '100px',
                          fontWeight: '600',
                          fontSize: '14px',
                          lineHeight: '20px',
                          padding: '14px 24px',
                          minWidth: '124px',
                        }}
                      >
                        {t('text.seeMore', { ns: 'common' })}
                      </Button>
                    )}
                  </Box>
                </Container>
              )}
            </Stack>

            <Stack sx={{ width: '33.33%', position: 'relative' }}>
              <Stack sx={{ position: 'sticky ', top: '100px' }}>
                <Stack
                  sx={{
                    borderRadius: '80px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.5)',
                    height: '46px',
                    paddingLeft: '24px',
                  }}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <SearchIcon sx={{ color: '#A0A4AB' }} />
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={exchangeDataOptions || []}
                    getOptionLabel={(item: any) => item?.name}
                    renderOption={(props, option) => {
                      return (
                        <Box component="li" {...props} key={option.id}>
                          <Stack direction={'row'} gap={'8px'} alignItems={'center'}>
                            <Image
                              src={option?.logo || ''}
                              alt="thumb"
                              height={48}
                              width={64}
                              loading="lazy"
                              objectFit="contain"
                            />
                            {option.name}
                          </Stack>
                        </Box>
                      )
                    }}
                    filterSelectedOptions
                    value={[]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          // remove underline text field
                          '& .mui-style-1hv5d1g-MuiInputBase-root-MuiInput-root:before': { border: 'none' },
                          '& .mui-style-1hv5d1g-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': {
                            border: 'none',
                          },
                          '& .mui-style-1q60rmi-MuiAutocomplete-endAdornment': {
                            display: 'none',
                          },
                          '& .mui-style-1gp7h1z::before': { border: 'none' },
                          '& .mui-style-1gp7h1z:hover:not(.Mui-disabled):before': {
                            border: 'none',
                          },
                          '& .mui-style-2iz2x6': {
                            display: 'none',
                          },
                        }}
                        placeholder={t('home.searchText')}
                        variant="standard"
                      />
                    )}
                    onChange={(event, newValue) => {
                      handleAddCurrentExchange(event, newValue)
                    }}
                    sx={{
                      flex: '105%',
                    }}
                    renderTags={(tagValue) =>
                      tagValue.map((option) => (
                        <Chip
                          sx={{
                            cursor: 'pointer',
                          }}
                          key={option?.id}
                          label={option?.name}
                        />
                      ))
                    }
                  />
                </Stack>
                <Typography variant="body1" fontWeight="bold" mt={2}>
                  {t('home.relativeTitle')}
                </Typography>
                <Grid container>
                  {currentExchanges?.map((exchange) => (
                    <Grid
                      item
                      key={exchange.id}
                      sx={{
                        backgroundColor: 'rgba(0,0,0,0.08)',
                        width: 'max-content',
                        borderRadius: 2,
                        px: 1.5,
                        py: 1.5,
                        mt: 1,
                        ml: 1,
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                          {exchange?.logo && (
                            <Image loading="lazy" src={exchange?.logo} alt="icon-exchange" height={32} width="45px" />
                          )}
                          <Typography variant="body1" noWrap>
                            {exchange?.name}
                          </Typography>
                        </Stack>
                        <CloseRoundedIcon
                          fontSize="small"
                          sx={{ cursor: 'pointer', color: '#777' }}
                          onClick={() => handleRemoveCurrentExchange(exchange)}
                        />
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
                <Divider
                  sx={{
                    my: 2,
                  }}
                />
                <Typography variant="body1">{description}</Typography>
                <Stack
                  spacing={3}
                  sx={{
                    backgroundColor: '#F4F8FF',
                    borderLeft: '4px solid #2A559C',
                    borderRadius: '8px',
                    pl: 3,
                    pt: 2,
                    pb: 2,
                    mt: 3,
                    mb: 3,
                  }}
                >
                  <Stack spacing={1}>
                    <Typography sx={{ color: 'subtitle.main' }} fontSize={14}>
                      {t(`complaint.bottom.t1`, { ns: 'home-page' })}
                    </Typography>
                    <Typography fontWeight={700} fontSize={24} lineHeight="36px">
                      {complaintAggregate}
                    </Typography>
                  </Stack>
                </Stack>

                <NextLink
                  href={
                    value?.user
                      ? locale === 'vi'
                        ? '/danh-gia-san/gui-danh-gia'
                        : '/exchange-review/create-review'
                      : '/authentication/login'
                  }
                  passHref
                >
                  <Button
                    sx={{
                      borderRadius: 4,
                      backgroundColor: 'secondary.main',
                      color: 'text.primary',
                      fontSize: '16px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                    }}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    {t(`button.complaint.send`, { ns: 'common' })}
                  </Button>
                </NextLink>
                <ReviewBanner />
              </Stack>
            </Stack>
          </Stack>
        )}
        {(isMobile || isTablet) && (
          <Stack>
            <Stack spacing={2}>
              {data?.map((item: any, index: any) => (
                <CategoryItem data={item} key={index} isMobile={isMobile} />
              ))}
            </Stack>
            {!isDesktop && data && data?.length > 0 && total && (
              <Container maxWidth="lg">
                <Box
                  sx={{
                    width: '100%',
                    pt: 4,
                    display: 'flex',
                    pb: 0,
                    justifyContent: 'center',
                  }}
                >
                  {data?.length < total && (
                    <Button
                      onClick={() => handleFetchMoreData()}
                      variant="contained"
                      sx={{
                        borderRadius: '100px',
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '20px',
                        padding: '14px 24px',
                        minWidth: '124px',
                      }}
                    >
                      {t('text.seeMore', { ns: 'common' })}
                    </Button>
                  )}
                </Box>
              </Container>
            )}

            <NextLink
              href={
                value.user
                  ? locale === 'vi'
                    ? '/danh-gia-san/gui-danh-gia'
                    : '/exchange-review/create-review'
                  : '/authentication/login'
              }
              passHref
            >
              <Button
                sx={{
                  borderRadius: 4,
                  backgroundColor: 'secondary.main',
                  color: 'text.primary',
                  fontSize: '16px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  marginBlock: '16px',
                  mt: 6,
                }}
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
              >
                {t(`button.complaint.send`, { ns: 'common' })}
              </Button>
            </NextLink>
            <ReviewBanner />
          </Stack>
        )}
      </Container>
    </Box>
  )
}

export default ReviewCategory
