module.exports = {
  hooks: {
    updateConfig (config) {
      if (config.onlyBuiltDependencies == null) {
        config.onlyBuiltDependencies = []
      }
      config.onlyBuiltDependencies.push(...require('./allow.json'))
      return config
    },
  },
}
