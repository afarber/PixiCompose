module.exports = {
    // Use ts-jest preset for TypeScript support
    preset: 'ts-jest',
    // Use jsdom environment to simulate browser for PixiJS
    testEnvironment: 'jsdom',
    // Look for tests in src directory
    roots: ['<rootDir>/src'],
    // Match test files in __tests__ directories or with .test.ts extension
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    // Map .js imports to .ts files for TypeScript compatibility
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    // Collect coverage from all TypeScript source files
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.test.ts',
        '!src/**/*.spec.ts',
        '!src/**/index.ts',
    ],
    // Enforce minimum 20% coverage threshold (same as OpenMapView)
    coverageThreshold: {
        global: {
            branches: 20,
            functions: 20,
            lines: 20,
            statements: 20,
        },
    },
    // Generate text, HTML, and lcov coverage reports
    coverageReporters: ['text', 'html', 'lcov'],
    // Output coverage to coverage directory
    coverageDirectory: 'coverage',
};
