const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};

module.exports = createJestConfig(config);
