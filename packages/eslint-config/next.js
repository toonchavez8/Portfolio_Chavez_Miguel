const { resolve } = require("node:path"); // Importing 'resolve' method from Node.js's 'path' module

const project = resolve(process.cwd(), "tsconfig.json"); // Resolving the path to 'tsconfig.json' relative to the current working directory

/** 
 * ESLint configuration object:
 * - Extends recommended ESLint configurations, Prettier rules, Vercel Next.js style guide, and custom rules from 'eslint-config-turbo'
 * - Defines global variables 'React' and 'JSX' as true
 * - Sets environment to Node.js and browser
 * - Adds 'only-warn' plugin
 * - Configures settings for resolving TypeScript paths based on 'tsconfig.json' location
 * - Ignores specific patterns such as dotfiles and 'node_modules/' directory
 * - Overrides settings for files with extensions '.js', '.jsx', '.ts', and '.tsx'
 */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/next"), // Using Vercel Next.js style guide
    "eslint-config-turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ["only-warn"],
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
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
};
