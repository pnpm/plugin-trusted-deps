import { test } from 'node:test'
import assert from 'assert'
import { TRUSTED_PACKAGE_NAMES, DEFAULT_ALLOW_BUILDS } from './index.mjs'

test('ESM named export: TRUSTED_PACKAGE_NAMES', () => {
  assert(Array.isArray(TRUSTED_PACKAGE_NAMES))
  assert.equal(typeof TRUSTED_PACKAGE_NAMES[0], 'string')
})

test('ESM named export: DEFAULT_ALLOW_BUILDS', () => {
  assert.equal(typeof DEFAULT_ALLOW_BUILDS, 'object')
  assert(!Array.isArray(DEFAULT_ALLOW_BUILDS))
  assert.equal(DEFAULT_ALLOW_BUILDS['@apollo/rover'], true)
  assert.equal(DEFAULT_ALLOW_BUILDS['core-js'], false)
})
