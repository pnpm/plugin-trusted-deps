module.exports.TRUSTED_PACKAGE_NAMES = require('./allow.json')

Object.defineProperty(module.exports, 'DEFAULT_ALLOW_BUILDS', {
  get () { return require('./allowBuilds.json') },
  enumerable: true,
})
