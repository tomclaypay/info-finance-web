import { endpoint, options } from '@app/constants/sitemap'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'

interface IExchangeSiteMap {
  slug?: string
  updatedAt?: string
}
function generateSiteMap(exchanges: IExchangeSiteMap[]) {
  const lastmod = dayjs(exchanges?.[0]?.updatedAt).format('YYYY-MM-DD')

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
  <loc>${process.env.NEXT_PUBLIC_SITE_URL}en/broker</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
  </url>
  ${exchanges
    ?.map(
      (exchange) => `<url>
  <loc>${process.env.NEXT_PUBLIC_SITE_URL}en/broker/${exchange?.slug}</loc>
  <lastmod>${dayjs(exchange?.updatedAt).format('YYYY-MM-DD')}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
  </url>`
    )
    .join('')}
  </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const graphqlQuery = {
    operationName: 'GetExchanges',
    query: `query GetExchanges($orderBy: [exchanges_order_by!], $where: exchanges_bool_exp) {
        exchanges(order_by: $orderBy, where: $where) {
          slug
          updatedAt
        }
      }`,
    variables: {
      where: { hidden: { _eq: false }, deleted_at: { _is_null: true } },
      orderBy: [
        {
          updatedAt: 'desc_nulls_last',
        },
      ],
    },
  }

  const response = await fetch(endpoint, { ...options, body: JSON.stringify(graphqlQuery) })

  const exchanges = await response.json()

  const sitemap = generateSiteMap(exchanges?.data?.exchanges ?? [])

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
