import { gql } from '@apollo/client'

const GET_ONE_ARTICLE = gql`
  query getOneArticle($filters: ArticleFiltersInput, $locale: I18NLocaleCode) {
    articles(filters: $filters, locale: $locale) {
      data {
        id
        attributes {
          title
          description
          content
          thumbnail {
            data {
              attributes {
                url
              }
            }
          }
          slug
          seoTitle
          seoDescription
          seoImg {
            data {
              attributes {
                url
              }
            }
          }
          articleCategories {
            data {
              id
              attributes {
                name
                slug
                description
              }
            }
          }
          linkBannerDesktop
          linkBannerMobile
          bannerDesktop {
            data {
              attributes {
                url
              }
            }
          }
          bannerMobile {
            data {
              attributes {
                url
              }
            }
          }
          createdAt
          updatedAt
          publishedTime
          publishedAt
        }
      }
    }
  }
`

export default GET_ONE_ARTICLE
