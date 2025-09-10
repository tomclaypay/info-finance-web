import { useQuery } from '@apollo/client'
import { useMobile } from '@app/components/common'
import AnotherNews from '@app/components/news/AnotherNews'
import ProviderCategoryNews from '@app/components/news/ProviderCategoryNews'
import WarningNews from '@app/components/news/WarningNews'
import { client } from '@app/contexts/apollo-client-context'
import GET_LATEST_ARTICLES from '@app/operations/rests/articles/get-latest-articles'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MainLayout } from '../../../components/main-layout'
import NewsLayout from '../../../components/news/NewsLayout'

interface NewsCategorySlugProps {
  dataArticlesByCategory: any
  dataArticlesByCategoryAnother: any
}

const NewsCategorySlug = ({ dataArticlesByCategory, dataArticlesByCategoryAnother }: NewsCategorySlugProps) => {
  const router = useRouter()
  const { newsCategorySlug } = router.query
  const isMobile = useMobile()
  const [limit, setLimit] = useState(4)
  const { t } = useTranslation('common')

  const { data: dataArticlesByCategoryAnotherOnMobile } = useQuery(GET_LATEST_ARTICLES, {
    variables: {
      pagination: {
        limit: limit,
        start: newsCategorySlug === 'tin-canh-bao' ? 8 : 6,
      },
      sort: ['publishedTime:desc', 'id:desc'],
      filters: {
        articleCategories: {
          slug: {
            eq: newsCategorySlug,
          },
        },
      },
    },
    context: { clientName: 'strapi' },
  })

  const handleReadMore = () => {
    setLimit(limit + 4)
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
      }}
    >
      {newsCategorySlug === 'tin-canh-bao' && dataArticlesByCategory && (
        <WarningNews detail={true} data={dataArticlesByCategory.articles.data} owner={true} />
      )}
      {newsCategorySlug === 'tin-tuc-san-giao-dich' && dataArticlesByCategory && (
        <ProviderCategoryNews
          newsCategorySlug="tin-tuc-san-giao-dich"
          data={dataArticlesByCategory.articles.data}
          owner={true}
          title={t('news.market')}
          detail={true}
        />
      )}
      {newsCategorySlug === 'tin-thi-truong' && dataArticlesByCategory && (
        <ProviderCategoryNews
          newsCategorySlug="tin-thi-truong"
          data={dataArticlesByCategory.articles.data}
          owner={true}
          detail={true}
          title={t('news.exchange')}
        />
      )}
      {isMobile
        ? dataArticlesByCategoryAnotherOnMobile && (
            <AnotherNews
              handleReadMore={handleReadMore}
              dataArticlesByCategoryAnother={dataArticlesByCategoryAnotherOnMobile}
            />
          )
        : dataArticlesByCategoryAnother && (
            <AnotherNews
              handleReadMore={handleReadMore}
              dataArticlesByCategoryAnother={dataArticlesByCategoryAnother}
            />
          )}
      {/* {isMobile && dataArticlesByCategoryAnotherOnMobile && (
        <AnotherNews dataArticlesByCategoryAnother={dataArticlesByCategoryAnotherOnMobile} />
      )} */}
    </Box>
  )
}

NewsCategorySlug.getLayout = (page: any) => (
  <MainLayout>
    <NewsLayout>{page}</NewsLayout>
  </MainLayout>
)

export default NewsCategorySlug

export async function getServerSideProps(content: any) {
  try {
    const { newsCategorySlug } = content.query
    const { data: dataArticlesByCategoryAnother } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: 8,
          start: newsCategorySlug === 'tin-canh-bao' ? 8 : 6,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        filters: {
          articleCategories: {
            slug: {
              eq: newsCategorySlug,
            },
          },
        },
      },
    })

    const { data: dataArticlesByCategory } = await client.query({
      query: GET_LATEST_ARTICLES,
      context: { clientName: 'strapi' },
      variables: {
        pagination: {
          limit: newsCategorySlug === 'tin-canh-bao' ? 8 : 6,
        },
        sort: ['publishedTime:desc', 'id:desc'],
        filters: {
          articleCategories: {
            slug: {
              eq: newsCategorySlug,
            },
          },
        },
      },
    })

    return {
      props: {
        dataArticlesByCategoryAnother: dataArticlesByCategoryAnother,
        dataArticlesByCategory: dataArticlesByCategory,
        ...(await serverSideTranslations(content.locale, ['common', 'home-page'])),
      },
    }
  } catch (error) {
    console.log(error)
  }
}
