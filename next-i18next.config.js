const path = require('path')

module.exports = {
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: false,
}
