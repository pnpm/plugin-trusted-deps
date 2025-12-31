const neostandard = require('neostandard')

module.exports = [
  ...neostandard(),
  {
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
]
