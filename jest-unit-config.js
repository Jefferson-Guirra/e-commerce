/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./jest.config.ts')
config.testMatch = ['**/*.spec.ts']
module.exports = config
export {}
