module.exports = {
  hooks: {
    updateConfig (config) {
      if (config.onlyBuiltDependencies == null) {
        config.onlyBuiltDependencies = []
      }
      const defaultAllowed = require('./allow.json')
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
      return config
    },
  },
}
