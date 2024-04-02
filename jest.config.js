// module.exports = {
//     testEnvironment: 'jest-environment-jsdom',
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     moduleNameMapper: {
//       '^@/components/(.*)$': '<rootDir>/components/$1',
//       '^@/firebase/(.*)$': '<rootDir>/firebase/$1',
//       '^@/(.*)$': '<rootDir>/$1',

//     },
//     transform: {
//       '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
//     },
//     testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
//   };module.exports = {
//     testEnvironment: 'jest-environment-jsdom',
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     moduleNameMapper: {
//       '^@/(.*)$': '<rootDir>/src/$1',
//       '^@/firebase/(.*)$': '<rootDir>/firebase/$1',
//     },
//     transform: {
//       '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
//     },
//     testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
//     collectCoverage: true, // Enable code coverage
//     coverageDirectory: 'coverage', // Directory where coverage reports will be stored
//     coverageReporters: ['text', 'lcov'], // Reporters to use (text, lcov, json, etc.)
//     collectCoverageFrom: [ // Specify patterns to include in coverage
//       'src/**/*.ts',
//       'src/**/*.tsx',
//       '!src/**/*.d.ts', // Exclude type definition files
//     ],
//     // Optional: Set coverage thresholds
//     // coverageThreshold: {
//     //   global: {
//     //     branches: 80,
//     //     functions: 80,
//     //     lines: 80,
//     //     statements: 80,
//     //   },
//     // },
//   };
  
  
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/components/$1',
      '^@/firebase/(.*)$': '<rootDir>/firebase/$1',
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    collectCoverageFrom: [
      'components/**/*.ts',
      'components/**/*.tsx',
      '!components/**/*.d.ts',
    ],
  };
  