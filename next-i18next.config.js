// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
  },
  localePath: path.resolve('./public/locales'),
  localeDetection: false,
}
