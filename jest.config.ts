module.exports = {
  roots: ['<rootDir>/src/server'],
  collectCoverageFrom: [
    '<rootDir>/src/server/**/*.ts',
    '!<rootDir>/src/main/**',
  ],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/coverage',
    '/node_modules/',
    '<rootDir>/src/server/main/factories',
    '<rootDir>/src/server/main/adapters',
  ],
}

export {}
