import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  //   preset: "ts-jest",
  testEnvironment: "jsdom",
  //   roots: ["<rootDir>/src", "<rootDir>/tests"],
  //   testMatch: ["**/*.test.(ts|tsx)"],
  //   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  //   setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },

  //   verbose: true,
};

export default config;
