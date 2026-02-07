module.exports = {
  hooks: {
    updateConfig (config) {
      const pnpmMajor = parseInt(config.packageManager?.version?.split('.')[0] ?? '0', 10)
      const useAllowBuilds = pnpmMajor >= 11
      const defaultAllowed = require('./allow.json')
      if (useAllowBuilds) {
        if (config.allowBuilds == null) {
          config.allowBuilds = {}
        }
        for (const allowed of defaultAllowed) {
          if (config.allowBuilds[allowed] == null) {
            config.allowBuilds[allowed] = true
          }
        }
      } else {
        if (config.onlyBuiltDependencies == null) {
          config.onlyBuiltDependencies = []
        }
        if (!config.ignoredBuiltDependencies?.length) {
          config.onlyBuiltDependencies.push(...defaultAllowed)
        } else {
          const ignored = new Set(config.ignoredBuiltDependencies)
          for (const allowed of defaultAllowed) {
            if (!ignored.has(allowed)) {
              config.onlyBuiltDependencies.push(allowed)
            }
          }
        }
      }
      return config
    },
  },
}
