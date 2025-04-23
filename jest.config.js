export default {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)\\.js$': '<rootDir>/src/$1.ts', // Map `@/` to `src/`
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore compiled files
};