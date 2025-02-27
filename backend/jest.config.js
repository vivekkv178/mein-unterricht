module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testMatch: ["./**/test.ts"],
  moduleFileExtensions: ["ts", "js"],
  setupFiles: ["<rootDir>/jest.setup.ts"],
};
