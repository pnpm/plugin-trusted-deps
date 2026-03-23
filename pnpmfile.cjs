module.exports = {
  hooks: {
    updateConfig (config) {
      const pnpmMajor = parseInt(config.packageManager?.version?.split('.')[0] ?? '0', 10)
      const useAllowBuilds = pnpmMajor >= 11
      const defaultAllowed = require('./allow.json')
      const defaultUntrusted = require('./untrusted.js')
      const ignored = new Set([
        ...defaultUntrusted,
        ...(config.ignoredBuiltDependencies ?? []),
      ])
      if (useAllowBuilds) {
        if (config.allowBuilds == null) {
          config.allowBuilds = {}
        }
        for (const allowed of defaultAllowed) {
          if (config.allowBuilds[allowed] == null && !ignored.has(allowed)) {
            config.allowBuilds[allowed] = true
          }
        }
      } else {
        if (config.onlyBuiltDependencies == null) {
          config.onlyBuiltDependencies = []
        }
        for (const allowed of defaultAllowed) {
          if (!ignored.has(allowed)) {
            config.onlyBuiltDependencies.push(allowed)
          }
        }
      }
      return config
    },
  },
}
