import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],


  // Enable coverage collection
  collectCoverage: true, 
  collectCoverageFrom: ["src/**/*.ts", "!src/server.ts", "!src/database/**"], 
  coverageDirectory: "coverage", 
  coverageReporters: ["json", "lcov", "text", "clover"], 
};

export default config;
