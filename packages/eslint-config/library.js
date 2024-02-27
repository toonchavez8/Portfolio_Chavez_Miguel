const { resolve } = require("node:path"); // Importing 'resolve' method from Node.js's 'path' module

const project = resolve(process.cwd(), "tsconfig.json"); // Resolving the path to 'tsconfig.json' relative to the current working directory

/** 
 * ESLint configuration object:
 * - Extends recommended ESLint configurations, Prettier rules, and custom rules from 'eslint-config-turbo'
 * - Adds 'only-warn' plugin
 * - Defines global variables 'React' and 'JSX' as true
 * - Sets environment to Node.js
 * - Configures settings for resolving TypeScript paths based on 'tsconfig.json' location
 * - Ignores specific patterns such as dotfiles, 'node_modules/', and 'dist/' directory
 * - Overrides settings for files with extensions '.js', '.jsx', '.ts', and '.tsx'
 */
module.exports = {
  extends: ["eslint:recommended", "prettier", "eslint-config-turbo"],
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
};
