/* eslint-disable */
const path = require('path')
const {paths} = require('react-app-rewired')
const rewireAliases = require('react-app-rewire-aliases')

module.exports = function override(config, env) {
  return rewireAliases.aliasesOptions({
    '@mt': path.resolve(__dirname, `${paths.appSrc}/`),
  })(config, env)
}
