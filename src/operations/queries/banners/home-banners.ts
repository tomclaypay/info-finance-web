// lib/gql/home-banners.aliases.ts
import { gql } from '@apollo/client'

export const GET_HOMEPAGE_BANNERS = gql/* GraphQL */ `
  query GetHomepageBanners($lang: String, $limit: Int = 5) {
    home: banner(
      where: { position: { _eq: "home" }, language: { _eq: $lang } }
      order_by: [{ updated_at: desc }]
      limit: $limit
    ) {
      id
      position
      updated_at
      link
      language
      id
      created_at
      url
    }

    header_desktop: banner(
      where: { position: { _eq: "header_desktop" }, language: { _eq: $lang } }
      order_by: [{ updated_at: desc }]
      limit: $limit
    ) {
      id
      position
      updated_at
      link
      language
      id
      created_at
      url
    }

    home_desktop: banner(
      where: { position: { _eq: "home_desktop" }, language: { _eq: $lang } }
      order_by: [{ updated_at: desc }]
      limit: $limit
    ) {
      id
      position
      updated_at
      link
      language
      id
      created_at
      url
    }

    small_home_desktop: banner(
      where: { position: { _eq: "small_home_desktop" }, language: { _eq: $lang } }
      order_by: [{ updated_at: desc }]
      limit: $limit
    ) {
      id
      position
      updated_at
      link
      language
      id
      created_at
      url
    }

    large_home_desktop: banner(
      where: { position: { _eq: "large_home_desktop" }, language: { _eq: $lang } }
      order_by: [{ updated_at: desc }]
      limit: $limit
    ) {
      id
      position
      updated_at
      link
      language
      id
      created_at
      url
    }

    right_home_desktop: banner(
      where: { position: { _eq: "right_home_desktop" }, language: { _eq: $lang } }
      order_by: [{ updated_at: desc }]
      limit: $limit
    ) {
      id
      position
      updated_at
      link
      language
      id
      created_at
      url
    }

    left_home_desktop: banner(
      where: { position: { _eq: "left_home_desktop" }, language: { _eq: $lang } }
      order_by: [{ updated_at: desc }]
      limit: $limit
    ) {
      id
      position
      updated_at
      link
      language
      id
      created_at
      url
    }

    home_popup_desktop: banner(
      where: { position: { _eq: "home_popup_desktop" }, language: { _eq: $lang } }
      order_by: [{ updated_at: desc }]
      limit: $limit
    ) {
      id
      position
      updated_at
      link
      language
      id
      created_at
      url
    }
  }
`

export type Banner = {
  id: string
  position: string
  updated_at: string
  link: string
  language: string
  created_at: string
}

export const pickImage = (b: Banner) => b.image_url || b.imageUrl || b.url || ''
