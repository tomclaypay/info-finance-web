import { useQuery } from '@apollo/client'
import { BannersListResponse } from '@app/interfaces/banner'
import GET_BANNERS from '@app/operations/queries/banners/get-banners'
import { useRouter } from 'next/router'

export enum BannerPosition {
  Home = 'home',
  Complaint = 'complaint',
  HomePopupDesktop = 'home_popup_desktop',
  HomePopupMobile = 'home_popup_mobile',
  HeaderDesktop = 'header_desktop',
  TestVideoBanner = 'test_video_banner',
  HeaderMobile = 'header_mobile',
  HomeDesktop = 'home_desktop',
  HomeMobile = 'home_mobile',
  SmallHomeDesktop = 'small_home_desktop',
  SmallHomeMobile = 'small_home_mobile',
  LargeHomeDesktop = 'large_home_desktop',
  LargeHomeMobile = 'large_home_mobile',
  RightHomeDesktop = 'right_home_desktop',
  LeftHomeDesktop = 'left_home_desktop',
  ArticleDetailDesktop = 'article_detail_desktop',
  ArticleDetailMobile = 'article_detail_mobile',
  ComplaintSidebarDesktop = 'complaint_sidebar_desktop',
  ComplaintSidebarMobile = 'complaint_sidebar_mobile',
  ListTopDesktop = 'list_top_desktop',
  ListTopMobile = 'list_top_mobile',
  ListSidebarDesktop = 'list_sidebar_desktop',
  ListSidebarMobile = 'list_sidebar_mobile',
  PaymentServiceDesktop = 'payment_service_desktop',
  PaymentServiceMobile = 'payment_service_mobile',
  LeftPaymentServiceDesktop = 'left_payment_service_desktop',
  LeftPaymentServiceMobile = 'left_payment_service_mobile',
  RightPaymentServiceDesktop = 'right_payment_service_desktop',
  RightPaymentServiceMobile = 'right_payment_service_mobile',
}

const useBanner = ({ position }: { position: BannerPosition }) => {
  const { locale } = useRouter()

  const { data, refetch } = useQuery<BannersListResponse>(GET_BANNERS, {
    variables: {
      positionEqual: position,
    },
  })

  const banner = data?.banners.find((item) => item.language === (locale === 'en' ? 'en' : 'vn'))
  return { data: banner, refetch }
}

export default useBanner
