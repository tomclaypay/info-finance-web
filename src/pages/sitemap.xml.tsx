import { endpoint, options } from '@app/constants/sitemap'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'

interface IGenerateSiteMapProps {
  lastmodeComplaint: string
  lastmodeEvent: string
  lastmodeExchange: string
}
function generateSiteMap({ lastmodeComplaint, lastmodeEvent, lastmodeExchange }: IGenerateSiteMapProps) {
  const currentDate = dayjs().format('YYYY-MM-DD')

  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
<loc>https://strapi.infofinance.com/api/sitemap/index.xml</loc>
<lastmod>${currentDate}</lastmod>
</sitemap>
<sitemap>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}broker-sitemap.xml</loc>
<lastmod>${lastmodeExchange}</lastmod>
</sitemap>
<sitemap>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}events-sitemap.xml</loc>
<lastmod>${lastmodeEvent}</lastmod>
</sitemap>
<sitemap>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}exchange-review-sitemap.xml</loc>
<lastmod>${lastmodeComplaint}</lastmod>
</sitemap>
<sitemap>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}broker-en-sitemap.xml</loc>
<lastmod>${lastmodeExchange}</lastmod>
</sitemap>
<sitemap>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}events-en-sitemap.xml</loc>
<lastmod>${lastmodeEvent}</lastmod>
</sitemap>
<sitemap>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}exchange-review-en-sitemap.xml</loc>
<lastmod>${lastmodeComplaint}</lastmod>
</sitemap>
</sitemapindex>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const graphqlQuery = {
    operationName: 'GetLastmod',
    query: `query GetLastmod($limit: Int, $orderBy: [complaints_order_by!], $eventOrderBy: [event_order_by!], $exchangesOrderBy: [exchanges_order_by!]) {
      complaints(limit: $limit, order_by: $orderBy) {
        updatedAt
      }
      event(limit: $limit, order_by: $eventOrderBy) {
        updated_at
      }
      exchanges(limit: $limit, order_by: $exchangesOrderBy) {
        updatedAt
      }
    }`,
    variables: {
      limit: 1,
      orderBy: [
        {
          updatedAt: 'desc_nulls_last',
        },
      ],
      eventOrderBy: [
        {
          updated_at: 'desc_nulls_last',
        },
      ],
      exchangesOrderBy: [
        {
          updatedAt: 'desc_nulls_last',
        },
      ],
    },
  }

  const response = await fetch(endpoint, { ...options, body: JSON.stringify(graphqlQuery) })
  const { data } = (await response.json()) ?? {}

  const lastmodeComplaint = dayjs(data?.complaints?.[0]?.updatedAt).format('YYYY-MM-DD')
  const lastmodeEvent = dayjs(data?.event?.[0]?.updated_at).format('YYYY-MM-DD')
  const lastmodeExchange = dayjs(data?.exchanges?.[0]?.updatedAt).format('YYYY-MM-DD')

  const sitemap = generateSiteMap({ lastmodeExchange, lastmodeEvent, lastmodeComplaint })

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
