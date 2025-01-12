import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^@memory-quasar/ui$': '<rootDir>/ui',
    '^@/(.*)$': '<rootDir>/ui/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json'
    }]
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/'
  ]
};

export default config; 