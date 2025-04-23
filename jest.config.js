export default {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)\\.js$': '<rootDir>/src/$1.ts', // Map `@/` to `src/` (js, ts)
    '^@/(.*)\\.json$': '<rootDir>/src/$1.json', // Map `@/` to `src/` (json)
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore compiled files
};