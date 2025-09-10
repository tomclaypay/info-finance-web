import { endpoint, options } from '@app/constants/sitemap'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'

interface IEventSiteMap {
  slug?: string
  updated_at?: string
}
function generateSiteMap(events: IEventSiteMap[]) {
  const lastmod = dayjs(events?.[0]?.updated_at).format('YYYY-MM-DD')

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
  <loc>${process.env.NEXT_PUBLIC_SITE_URL}en/events</loc>
  <lastmod>${lastmod}</lastmod>
  </url>

  <url>
  <loc>${process.env.NEXT_PUBLIC_SITE_URL}en/end</loc>
  <lastmod>${lastmod}</lastmod>
  </url>
  
  ${events
    ?.map(
      (event) => `<url>
  <loc>${process.env.NEXT_PUBLIC_SITE_URL}en/events/${event?.slug}</loc>
  <lastmod>${dayjs(event?.updated_at).format('YYYY-MM-DD')}</lastmod>
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
    operationName: 'GetEvents',
    query: `query GetEvents($orderBy: [event_order_by!]) {
        event(order_by: $orderBy) {
          updated_at
          slug
        }
      }`,
    variables: {
      orderBy: [
        {
          updated_at: 'desc_nulls_last',
        },
      ],
    },
  }

  const response = await fetch(endpoint, { ...options, body: JSON.stringify(graphqlQuery) })

  const events = await response.json()

  const sitemap = generateSiteMap(events?.data?.event ?? [])

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
