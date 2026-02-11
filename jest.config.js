const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^react-markdown$": "<rootDir>/__mocks__/react-markdown.js",
  },
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-markdown|rehype-.*|remark-.*|unist-.*|vfile.*|micromark.*|unified|bail|is-plain-obj|trough|devlop|property-information|space-separated-tokens|comma-separated-tokens|hast-util-whitespace|trim-lines|react-is|katex|github-slugger|refractor)/)",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
