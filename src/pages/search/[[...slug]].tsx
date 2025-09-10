import { MainLayout } from '@app/components/main-layout'
import { Box, Container, Stack } from '@mui/system'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useMemo, useState } from 'react'
import { Button, Divider, InputBase, Tabs, Typography } from '@mui/material'
import { SearchHeaderIcon } from '@app/icons'
import { useQuery } from '@apollo/client'
import GET_SEARCH from '@app/operations/queries/search/get-search'
import ExchangeHorizontalCard from '@app/components/exchange/card/ExchangeHorizontalCard'
import LatestNewsItemRow from '@app/components/news/LatestNews-item-row'
import LatestNewsItem from '@app/components/news/LatestNews-item'
import { useMobile } from '@app/components/common'
import { useTranslation } from 'next-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'

const SearchPage = () => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const isMobile = useMobile()
  const valueSearch = router.query.keyword
  const [status, setStatus] = useState('exchange')
  const [fieldSearch, setFieldSearch] = useState(valueSearch)
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldSearch(e.target.value)
  }

  const { data, fetchMore } = useQuery(GET_SEARCH, {
    variables: {
      key: valueSearch,
      type: status,
      limit: 5,
    },
  })

  const dataLength = data?.search?.result?.length
  const dataCount = data?.search?.count

  const NonData = useMemo(() => {
    return (
      <Stack sx={{ width: '100%', textAlign: 'center' }} alignItems={'center'}>
        <Typography
          fontWeight={700}
          color={'#D0D0D0'}
          sx={{
            width: isMobile ? '100%' : '45%',
            fontSize: isMobile ? '24px' : '40px',
          }}
        >
          {t('nonResult')}
        </Typography>
      </Stack>
    )
  }, [isMobile, t])

  const Result = useMemo(() => {
    const handleFetchMore = () => {
      fetchMore({
        variables: {
          offset: dataLength,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          fetchMoreResult.search.result = [...prevResult?.search?.result, ...fetchMoreResult?.search?.result]
          return fetchMoreResult
        },
      })
    }
    switch (status) {
      case 'exchange':
        if (dataLength === 0 || fieldSearch === '%') {
          return NonData
        } else {
          return (
            <InfiniteScroll
              dataLength={dataLength || 5}
              next={handleFetchMore}
              hasMore={dataLength < dataCount ? true : false}
              loader={
                <Typography
                  sx={{
                    textAlign: 'center',
                    my: 2,
                    fontWeight: 'bold',
                  }}
                  color="primary.main"
                >
                  Loading...
                </Typography>
              }
              height={dataLength == 0 ? 100 : 600}
            >
              <Stack spacing={3}>
                {data?.search?.result?.map((exchange: any, index: any) => (
                  <ExchangeHorizontalCard key={index} exchange={exchange} />
                ))}
              </Stack>
            </InfiniteScroll>
          )
        }

      case 'exchange-review':
        if (dataLength === 0 || fieldSearch === '%' || dataLength === undefined) {
          return NonData
        } else {
          return (
            <InfiniteScroll
              dataLength={dataLength || 5}
              next={handleFetchMore}
              hasMore={dataLength < dataCount ? true : false}
              loader={
                <Typography
                  sx={{
                    textAlign: 'center',
                    my: 2,
                    fontWeight: 'bold',
                  }}
                  color="primary.main"
                >
                  Loading...
                </Typography>
              }
              height={dataLength == 0 ? 100 : 600}
            >
              <Stack direction="row" spacing={4}>
                <Stack sx={{ flex: '2' }}>
                  <Stack spacing={3}>
                    {data?.search?.result?.map((complaint: any, index: any) => (
                      <ItemReviewSearch data={complaint} key={index} />
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </InfiniteScroll>
          )
        }
      case 'news':
        if (dataLength === 0 || fieldSearch === '%') {
          return NonData
        } else {
          return (
            <InfiniteScroll
              dataLength={dataLength || 5}
              next={handleFetchMore}
              hasMore={dataLength < dataCount ? true : false}
              loader={
                <Typography
                  sx={{
                    textAlign: 'center',
                    my: 2,
                    fontWeight: 'bold',
                  }}
                  color="primary.main"
                >
                  Loading...
                </Typography>
              }
              height={dataLength == 0 ? 100 : 600}
            >
              <Stack spacing={3}>
                {data?.search?.result?.map((item: any, index: any) => (
                  <Stack
                    spacing={3}
                    key={index}
                    sx={{
                      height: isMobile ? '100%' : '173px',
                    }}
                  >
                    {isMobile ? <LatestNewsItem data={item} /> : <LatestNewsItemRow data={item} image />}
                    <Divider />
                  </Stack>
                ))}
              </Stack>
            </InfiniteScroll>
          )
        }
    }
    return <></>
  }, [NonData, data?.search?.result, isMobile, status, dataLength, fetchMore, dataCount, fieldSearch])

  const tabData = [
    { label: 'tabs.tab1', status: 'exchange' },
    { label: 'tabs.tab2', status: 'exchange-review' },
    { label: 'tabs.tab3', status: 'news' },
  ]

  return (
    <Box>
      <Container maxWidth="lg" sx={{ paddingY: '64px' }}>
        <Stack gap={'16px'}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '50px',
              backgroundColor: 'background.default',
              border: '1px solid',
              borderColor: 'subtitle.main',
              display: 'flex',
              width: '100%',
              paddingX: '24px',
              paddingY: isMobile ? '12px' : '16px',
              alignItems: 'center',
            }}
          >
            <SearchHeaderIcon />
            <InputBase
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  router.push({
                    pathname: '/search',
                    query: { keyword: fieldSearch },
                  })
                }
              }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={fieldSearch}
              onChange={handleInput}
              sx={{
                color: 'inherit',
                '& .MuiInputBase-input': {
                  padding: '0 0 0 16px',
                  fontSize: isMobile ? '20px' : '24px',
                  lineHeight: '26px',
                  fontWeight: 700,
                },
                width: '100%',
              }}
            />
          </Box>
          <Box>
            <Tabs>
              {tabData.map((tab, index) => (
                <Button
                  key={index}
                  sx={{
                    borderRadius: 4,
                    paddingX: '40px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: status === tab.status ? '#F4F8FF' : 'transparent',
                    color: status === tab.status ? 'primary.main' : 'unactive.main',
                    '&:hover': {
                      backgroundColor: '#F4F8FF',
                      color: 'primary.main',
                    },
                  }}
                  onClick={() => setStatus(tab.status)}
                >
                  {t(`${tab.label}`, {
                    ns: 'common',
                  })}
                </Button>
              ))}
            </Tabs>
            <Divider />
          </Box>
          {Result}
        </Stack>
      </Container>
    </Box>
  )
}
export default SearchPage

SearchPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'complaints', 'exchange'])),
      // Will be passed to the page component as props
    },
  }
}
