const { test } = require('node:test')
const assert = require('assert')
const { TRUSTED_PACKAGE_NAMES } = require('./index.js')
const pnpmfile = require('./pnpmfile.cjs')

test('TRUSTED_PACKAGE_NAMES', () => {
  assert(Array.isArray(TRUSTED_PACKAGE_NAMES))
  assert.equal(typeof TRUSTED_PACKAGE_NAMES[0], 'string')
})

test('do not reenable dependency builds', () => {
  const config =  {
    ignoredBuiltDependencies: ['esbuild'],
  }
  pnpmfile.hooks.updateConfig(config)
  assert(!config.onlyBuiltDependencies.includes('esbuild'))
  assert(config.onlyBuiltDependencies.includes('@apollo/rover'))
})
