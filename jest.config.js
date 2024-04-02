module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/assets/(.*)$': '<rootDir>/assets/$1',
      '^@/pages/(.*)$': '<rootDir>/pages/$1',
      '^@/services/(.*)$': '<rootDir>/services/$1',
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
      'services/**/*.ts',
      'services/**/*.tsx',
      '!services/**/*.d.ts',
      'firebase/**/*.ts',
      'firebase/**/*.tsx',
      '!firebase/**/*.d.ts',
      'pages/**/*.ts',
      'pages/**/*.tsx',
      '!pages/**/*.d.ts',
    ],
  };
  