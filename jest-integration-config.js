/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./jest.config.ts')
config.testMatch = ['**/*.test.ts']
module.exports = config
