import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export const TRUSTED_PACKAGE_NAMES = require('./allow.json')
export const DEFAULT_ALLOW_BUILDS = require('./allowBuilds.json')
