const assert = require('assert')
const { TRUSTED_PACKAGE_NAMES } = require('./index.js')

assert(Array.isArray(TRUSTED_PACKAGE_NAMES))
assert.equal(typeof TRUSTED_PACKAGE_NAMES[0], 'string')
