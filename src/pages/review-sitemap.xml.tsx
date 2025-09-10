import { endpoint, options } from '@app/constants/sitemap'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'

interface IGenerateSiteMapProps {
  slug?: string
  updatedAt?: string
}
function generateSiteMap(complaints: IGenerateSiteMapProps[]) {
  const lastmod = dayjs(complaints?.[0]?.updatedAt).format('YYYY-MM-DD') ?? ''

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}danh-gia-san</loc>
<lastmod>${lastmod}</lastmod>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}danh-gia-san/lua-dao</loc>
<lastmod>${lastmod}</lastmod>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}danh-gia-san/hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu</loc>
<lastmod>${lastmod}</lastmod>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}danh-gia-san/danh-gia-tong-quat</loc>
<lastmod>${lastmod}</lastmod>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITE_URL}danh-gia-san/ly-do-khac</loc>
<lastmod>${lastmod}</lastmod>
</url>
${complaints
  ?.map(
    (complaint) => `<url>
  <loc>${process.env.NEXT_PUBLIC_SITE_URL}danh-gia-san${complaint?.slug ? `/${complaint?.slug}` : ''}</loc>
  <lastmod>${dayjs(complaint?.updatedAt).format('YYYY-MM-DD') ?? ''}</lastmod>
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
    operationName: 'GetComplaints',
    query: `query GetComplaints($orderBy: [complaints_order_by!], $where: complaints_bool_exp) {
            complaints(order_by: $orderBy, where: $where) {
              slug
              updatedAt
            }
          }`,
    variables: {
      orderBy: [
        {
          updatedAt: 'desc_nulls_last',
        },
      ],
      where: {
        _and: [
          {
            status: {
              _neq: 'pending',
            },
          },
          {
            status: {
              _neq: 'accepted',
            },
          },
          {
            status: {
              _neq: 'declined',
            },
          },
          {
            status: {
              _neq: 'rejected',
            },
          },
        ],
      },
    },
  }

  const response = await fetch(endpoint, { ...options, body: JSON.stringify(graphqlQuery) })

  const complaints = await response.json()

  const sitemap = generateSiteMap(complaints?.data?.complaints)
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
