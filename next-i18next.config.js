const path = require('path')

module.exports = {
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
  },
  localePath: path.resolve('./public/locales'), // QUAN TRỌNG cho build/prod
  reloadOnPrerender: false,
}
