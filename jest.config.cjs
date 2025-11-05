const esModules = ['axios', '@bundled-es-modules', 'msw', 'until-async', 'broadcast-channel'].join('|');

module.exports = {
  roots: ['<rootDir>/src'],
  verbose: true,
testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    `[/\\\\]node_modules[/\\\\](?!${esModules}).+\\.(js|jsx|mjs|cjs|ts|tsx)$`,
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
