import { URL_LOCALE } from '@app/constants/common'

// const getURLByLocale = (query: any, asPath: string, localeData: any, t: any, locale: any) => {
//   return !asPath.includes('your-review' || 'danh-gia-cua-ban')
//     ? /${asPath.split('/')[1] === '' ? '' : URL_LOCALE[locale || 'vi'][asPath.split('/')[1].split('?')[0]]}/${
//         localeData?.articles?.data?.[0]?.attributes?.localizations?.data[0]?.attributes?.slug || ''
//       }${query.exchangeSlug || ''}${query.eventSlug || ''}${
//         query.reviewCategorySlug
//           ? URL_LOCALE[locale || 'vi'][query.reviewCategorySlug] === undefined
//             ? query.reviewCategorySlug
//             : URL_LOCALE[locale || 'vi'][query.reviewCategorySlug]
//           : ''
//       }
//     : /${URL_LOCALE[locale || 'vi'][asPath.split('/')[1].split('?')[0]]}/${asPath.split('/')[2]}/${
//         query.yourReviewId || ''
//       }
// }

const getURLByLocale = (query: any, asPath: string, localeData: any, t: any, locale: any) => {
  const localeKey = locale || 'vi'
  const pathSegments = asPath.split('/')
  const firstSegment = pathSegments[1].split('?')[0]
  const isReview =
    asPath.includes('your-review') ||
    asPath.includes('danh-gia-cua-ban') ||
    asPath.includes('gui-danh-gia') ||
    asPath.includes('create-review')
  const localizedFirstSegment = URL_LOCALE[localeKey][firstSegment] || ''

  if (isReview) {
    const exposureId = query.yourReviewId || ''
    return `/${localizedFirstSegment}/${URL_LOCALE[localeKey][pathSegments[2]]}/${exposureId}`
  }

  const articleSlug = localeData?.articles?.data?.[0]?.attributes?.localizations?.data[0]?.attributes?.slug || ''
  const exchangeSlug = query.exchangeSlug || ''
  const eventSlug = query.eventSlug || ''

  let reviewCategorySlug = query.reviewCategorySlug || ''
  if (reviewCategorySlug) {
    reviewCategorySlug = URL_LOCALE[localeKey][reviewCategorySlug] || reviewCategorySlug
  }

  return `/${localizedFirstSegment}/${articleSlug}${exchangeSlug}${eventSlug}${reviewCategorySlug}`
}

export default getURLByLocale
