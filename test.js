const { test } = require('node:test')
const assert = require('assert')
const { TRUSTED_PACKAGE_NAMES } = require('./index.js')
const pnpmfile = require('./pnpmfile.cjs')

test('TRUSTED_PACKAGE_NAMES', () => {
  assert(Array.isArray(TRUSTED_PACKAGE_NAMES))
  assert.equal(typeof TRUSTED_PACKAGE_NAMES[0], 'string')
})

test('populates onlyBuiltDependencies for pnpm < 11', () => {
  const config = {
    packageManager: { version: '10.28.1' },
  }
  pnpmfile.hooks.updateConfig(config)
  assert(config.onlyBuiltDependencies.includes('@apollo/rover'))
  assert.equal(config.allowBuilds, undefined)
})

test('excludes untrusted packages for pnpm < 11', () => {
  const config = {
    packageManager: { version: '10.28.1' },
  }
  pnpmfile.hooks.updateConfig(config)
  assert(!config.onlyBuiltDependencies.includes('core-js'))
  assert(config.ignoredBuiltDependencies.includes('core-js'))
})

test('do not reenable dependency builds for pnpm < 11', () => {
  const config = {
    packageManager: { version: '10.28.1' },
    ignoredBuiltDependencies: ['esbuild'],
  }
  pnpmfile.hooks.updateConfig(config)
  assert(!config.onlyBuiltDependencies.includes('esbuild'))
  assert(config.onlyBuiltDependencies.includes('@apollo/rover'))
})

test('populates allowBuilds for pnpm >= 11', () => {
  const config = {
    packageManager: { version: '11.0.0' },
  }
  pnpmfile.hooks.updateConfig(config)
  assert.equal(typeof config.allowBuilds, 'object')
  assert(!Array.isArray(config.allowBuilds))
  assert.equal(config.allowBuilds['@apollo/rover'], true)
  assert.equal(config.onlyBuiltDependencies, undefined)
})

test('excludes untrusted packages for pnpm >= 11', () => {
  const config = {
    packageManager: { version: '11.0.0' },
  }
  pnpmfile.hooks.updateConfig(config)
  assert.equal(config.allowBuilds['core-js'], false)
})

test('respects user override of untrusted package for pnpm >= 11', () => {
  const config = {
    packageManager: { version: '11.0.0' },
    allowBuilds: { 'core-js': true },
  }
  pnpmfile.hooks.updateConfig(config)
  assert.equal(config.allowBuilds['core-js'], true)
})

test('do not reenable dependency builds for pnpm >= 11', () => {
  const config = {
    packageManager: { version: '11.0.0' },
    allowBuilds: { esbuild: false },
  }
  pnpmfile.hooks.updateConfig(config)
  assert.equal(config.allowBuilds.esbuild, false)
  assert.equal(config.allowBuilds['@apollo/rover'], true)
})
