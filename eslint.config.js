const neostandard = require('neostandard')

module.exports = [
  { ignores: ['index.mjs'] },
  ...neostandard(),
  {
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
]
