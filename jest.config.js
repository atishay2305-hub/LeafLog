module.exports = {
  // Specifies the root directory for Jest to look for test files.
  roots: ['<rootDir>/Testing_Jest'],

  // An array of file extensions your tests use.
  testMatch: ['**/*.test.tsx'],

  // Setup files to run before each test.
  setupFilesAfterEnv: ['<rootDir>/Testing_Jest/setupTests.mjs'],

  // Transform TypeScript files before running tests.
  transform: {
    '^.+\\.js$': 'babel-jest', // Add Babel transformation for JavaScript files
    '^.+\\.jsx$': 'babel-jest', // Add Babel transformation for JSX files
    "^.+\\.tsx?$": "babel-jest",
    '^.+\\.ts$': 'ts-jest', // Add TypeScript transformation for TypeScript files
    '^.+\\.tsx$': 'ts-jest', // Add TypeScript transformation for TypeScript JSX files
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$',
  ],

  // Other Jest configuration options...
};
