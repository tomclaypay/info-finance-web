import { client } from '@app/contexts/apollo-client-context'
import { MainLayout } from '@app/components/main-layout'
import { Box, Container } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import GET_CUSTOMER_SERVICE from '@app/operations/rests/articles/get-custom-service'
import FAQ from '@app/components/staticPage/FAQ'
import PrivacyPolicy from '@app/components/staticPage/PrivacyPolicy'
import TermsConditions from '@app/components/staticPage/TermsConditions'
import { useMobile } from '@app/components/common'

interface StaticPageProps {
  dataCustomerService: any
}

const StaticPage = ({ dataCustomerService }: StaticPageProps) => {
  const router = useRouter()
  const staticSlug = router?.query?.staticSlug

  const isMobile = useMobile()
  if (
    staticSlug !== 'faq' &&
    staticSlug !== 'privacy-policy' &&
    staticSlug !== 'terms-and-conditions' &&
    staticSlug !== 'hoi-dap' &&
    staticSlug !== 'dieu-khoan-dieu-kien' &&
    staticSlug !== 'chinh-sach-bao-mat' &&
    typeof window !== 'undefined'
  ) {
    router.push('/404')
  } else {
    return (
      <Box
        sx={{
          backgroundColor: 'background.paper',
          pt: isMobile ? 3 : 8,
          pb: 7,
        }}
      >
        <Container maxWidth="lg">
          {(staticSlug === 'faq' || staticSlug === 'hoi-dap') && (
            <FAQ
              data={
                dataCustomerService?.data &&
                dataCustomerService?.data?.filter((item: any) => item.attributes.type === 'faq')
              }
            />
          )}
          {(staticSlug === 'privacy-policy' || staticSlug === 'chinh-sach-bao-mat') && (
            <PrivacyPolicy
              data={
                dataCustomerService?.data &&
                dataCustomerService?.data?.filter((item: any) => item.attributes.type === 'privacy_policy')
              }
            />
          )}
          {(staticSlug === 'terms-and-conditions' || staticSlug === 'dieu-khoan-dieu-kien') && (
            <TermsConditions
              data={
                dataCustomerService?.data &&
                dataCustomerService?.data?.filter((item: any) => item.attributes.type === 'terms_and_conditions')
              }
            />
          )}
        </Container>
      </Box>
    )
  }
}

StaticPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default StaticPage

export async function getServerSideProps({ locale }: any) {
  try {
    const { data: dataCustomerService } = await client.query({
      query: GET_CUSTOMER_SERVICE,
      context: { clientName: 'strapi' },
      variables: {
        locale: locale,
        pagination: {
          limit: 20,
        },
        sort: 'createdAt:asc',
      },
    })

    if (dataCustomerService) {
      return {
        props: {
          dataCustomerService: dataCustomerService.customerServices,
          ...(await serverSideTranslations(locale, ['common', 'home-page', 'seo'])),
        },
      }
    } else
      return {
        props: {
          dataCustomerService: null,
          ...(await serverSideTranslations(locale, ['common', 'home-page', 'seo'])),
        },
      }
  } catch (error) {
    console.log(error)
    return {
      props: {
        dataCustomerService: null,
        ...(await serverSideTranslations(locale, ['common', 'home-page', 'seo'])),
      },
    }
  }
}
