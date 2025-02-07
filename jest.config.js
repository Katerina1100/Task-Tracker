export default {
    testEnvironment: "jest-environment-jsdom", // Наместо "jsdom", користиме "jest-environment-jsdom"
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  };
  