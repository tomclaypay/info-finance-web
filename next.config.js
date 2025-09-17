// next.config.js
// NOTE: Gỡ next-transpile-modules và dùng built-in transpilePackages của Next 13+
// Bundle analyzer giữ nguyên.

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
})

// Chỉ import phần i18n từ next-i18next (KHÔNG kéo các key khác như localePath vào i18n)
// const { i18n } = require('./next-i18next.config.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      's3.ap-southeast-1.amazonaws.com',
      'lh3.googleusercontent.com',
      'infofx-dev.s3.ap-southeast-1.amazonaws.com',
      'infofinance-dev.s3.ap-southeast-1.amazonaws.com',
      'infofx-prod.s3.ap-southeast-1.amazonaws.com',
      'infofinance-prod.s3.ap-southeast-1.amazonaws.com',
      'infofx.s3.ap-southeast-1.amazonaws.com',
      'infofx.s3.amazonaws.com',
      'images.dmca.com',
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 768, 920, 1024, 1280, 1536], // thêm 920 cho banner
    imageSizes: [64, 96, 128, 164, 180, 232, 256, 320, 384, 400, 432], // thumbnail/card
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Thay cho next-transpile-modules
  // (Giữ lại các gói bạn từng đưa vào withTM; thêm MUI nếu cần)
  transpilePackages: [
    '@fullcalendar/common',
    '@fullcalendar/react',
    '@fullcalendar/daygrid',
    '@fullcalendar/list',
    '@fullcalendar/timegrid',
    '@fullcalendar/timeline',
    '@mui/material',
    '@mui/icons-material',
    '@mui/lab',
  ],

  // Tối ưu import cho MUI & FullCalendar (thay cho experimental.modularizeImports cũ)
  experimental: {
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
      '@mui/lab',
      '@fullcalendar/common',
      '@fullcalendar/react',
      '@fullcalendar/daygrid',
      '@fullcalendar/list',
      '@fullcalendar/timegrid',
      '@fullcalendar/timeline',
      'date-fns',
    ],
    staleTimes: {
      dynamic: 30, // giây cho route động (detail, search…)
      static: 180, // giây cho route tĩnh
    },
  },

  // i18n của Next CHỈ có 4 key hợp lệ; phần localePath đặt ở next-i18next.config.js
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localeDetection: false,
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },

  webpack(config, { isServer }) {
    // Giữ rule svg như hiện tại
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgoConfig: { plugins: [{ removeViewBox: false }] } },
        },
      ],
    })

    if (!isServer) {
      // Chặn core modules Node trong bundle client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        http2: false,
        fs: false,
        net: false,
        tls: false,
        dns: false,
      }
      // Ép AWS SDK dùng handler/browser utils thay vì Node
      config.resolve.alias = {
        ...config.resolve.alias,
        '@aws-sdk/node-http-handler': '@aws-sdk/fetch-http-handler',
        '@aws-sdk/util-user-agent-node': '@aws-sdk/util-user-agent-browser',
        '@aws-sdk/hash-node': '@aws-sdk/hash-browser',
      }
    }

    return config
  },

  async rewrites() {
    return [
      { source: '/gioi-thieu', destination: '/about' },
      { source: '/tra-cuu-san', destination: '/broker' },
      { source: '/tra-cuu-san/:exchangeSlug', destination: '/broker/:exchangeSlug' },
      { source: '/tin-tuc', destination: '/news' },
      { source: '/tin-tuc/:newsSlug', destination: '/news/:newsSlug' },
      { source: '/kien-thuc', destination: '/knowledge' },
      { source: '/kien-thuc/:newsSlug', destination: '/knowledge/:newsSlug' },
      { source: '/lich-kinh-te', destination: '/economic-calendar' },
      { source: '/su-kien', destination: '/events' },
      { source: '/su-kien/:eventSlug', destination: '/events/:eventSlug' },
      { source: '/danh-gia-san', destination: '/exchange-review' },
      { source: '/danh-gia-san/danh-gia-cua-ban', destination: '/exchange-review/your-review' },
      { source: '/danh-gia-san/gui-danh-gia', destination: '/exchange-review/create-review' },
      { source: '/danh-gia-san/:reviewCategorySlug', destination: '/exchange-review/:reviewCategorySlug' },
      {
        source: '/danh-gia-san/danh-gia-cua-ban/:yourReviewId',
        destination: '/exchange-review/your-review/:yourReviewId',
      },
      { source: '/dich-vu-thanh-toan', destination: '/payment-service' },
      { source: '/ho-so', destination: '/profile' },
    ]
  },

  async redirects() {
    return [{ source: '/docs', destination: '/docs/welcome', permanent: true }]
  },

  output: 'standalone',
}

module.exports = withBundleAnalyzer(nextConfig)
