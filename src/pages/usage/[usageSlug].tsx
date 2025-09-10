import { useMobile } from '@app/components/common'
import { MainLayout } from '@app/components/main-layout'
import { client } from '@app/contexts/apollo-client-context'
import GET_USAGE_PAGE from '@app/operations/rests/articles/get-usage-page'
import { Box, Container, Typography } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

interface UsagePageProps {
  usageData: any
}

const UsagePage = ({ usageData }: UsagePageProps) => {
  const isMobile = useMobile()

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: isMobile ? 3 : 8,
        pb: 7,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h1">{usageData?.data?.[0]?.attributes?.title}</Typography>
        {usageData?.data?.[0] && (
          <Typography
            dangerouslySetInnerHTML={{
              __html: usageData?.data?.[0]?.attributes?.description,
            }}
          />
        )}
      </Container>
    </Box>
  )
}

UsagePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default UsagePage

export async function getServerSideProps({ locale, query }: any) {
  try {
    const { data: usageData } = await client.query({
      query: GET_USAGE_PAGE,
      context: { clientName: 'strapi' },
      variables: {
        locale: locale,
        filters: {
          slug: {
            eq: query.usageSlug,
          },
        },
      },
    })

    if (usageData) {
      return {
        props: {
          usageData: usageData.customerServices,
          ...(await serverSideTranslations(locale, ['common', 'home-page'])),
        },
      }
    } else
      return {
        props: {
          usageData: null,
          ...(await serverSideTranslations(locale, ['common', 'home-page'])),
        },
      }
  } catch (error) {
    console.log(error)
    return {
      props: {
        usageData: null,
        ...(await serverSideTranslations(locale, ['common', 'home-page'])),
      },
    }
  }
}
