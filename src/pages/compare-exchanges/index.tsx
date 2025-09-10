import CompareExchanges from '@app/components/compare-exchanges/compareExchanges'
import { MainLayout } from '@app/components/main-layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CompareExchangesPage = () => {
  return <CompareExchanges />
}

CompareExchangesPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default CompareExchangesPage

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
