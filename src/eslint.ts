/** @format */

import * as path from "path";
import * as fs from "fs";

const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  babelOptions: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
  },
  requireConfigFile: false,
  project: "./tsconfig.json",
};

const isJsMoreTs = async (path = "src") => {
  const fg = require("fast-glob");
  const jsFiles = await fg(`${path}/src/**/*.{js,jsx}`, { deep: 3 });
  const tsFiles = await fg(`${path}/src/**/*.{ts,tsx}`, { deep: 3 });
  return jsFiles.length > tsFiles.length;
};

const configPath = path.join(__dirname, "fabric.rc");
const isTsProject = fs.existsSync(
  path.join(process.cwd() || ".", "./tsconfig.json")
);

if (isTsProject) {
  try {
    if (
      !fs.existsSync(configPath) &&
      fs.existsSync(path.join("configPath", ".."))
    ) {
      isJsMoreTs(configPath).then((jsMoreTs) => {
        fs.writeFileSync(configPath, new Date().getDate().toString());
        if (!jsMoreTs) return;
        console.log("这是一个 TypeScript 项目，如果不是请删除 tsconfig.json");
      });
    } else {
      const cacheTime = fs.readFileSync(configPath).toString();
      if (new Date().getDate() !== parseInt(cacheTime, 10)) {
        fs.unlink(configPath, () => {});
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  extends: ["airbnb-typescript", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["eslint-comments", "jest", "unicorn"],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    "generator-star-spacing": 0,
    "function-paren-newline": 0,
    "import/no-unresolved": [
      2,
      {
        ignore: ["^@/", "^@@/"],
        caseSensitive: true,
        commonjs: true,
      },
    ],
    "import/order": "warn",
    "import/no-extraneous-dependencies": [
      2,
      {
        optionalDependencies: true,
        devDependencies: [
          "**/tests/**.{ts,js,jsx,tsx}",
          "**/_test_/**.{ts,js,jsx,tsx}",
          "/mock/**/**.{ts,js,jsx,tsx}",
          "**/**.test.{ts,js,jsx,tsx}",
          "**/_mock.{ts,js,jsx,tsx}",
          "**/example/**.{ts,js,jsx,tsx}",
          "**/examples/**.{ts,js,jsx,tsx}",
        ],
      },
    ],
    "linebreak-style": 0,
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": [0, "camel-case"],
    "sort-imports": 0,
    // Use function hoisting to improve code readability
    // "no-use-before-define": [
    //   "error",
    //   { functions: false, classes: true, variables: true },
    // ],
    // // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    // "@typescript-eslint/no-use-before-define": [
    //   "error",
    //   { functions: false, classes: true, variables: true, typedefs: true },
    // ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/explicit-function-return-type": [
      "off",
      { allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-var-requires": 0,
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "import/no-cycle": 0,
    // Conflict with prettier
    "arrow-body-style": 0,
    "arrow-parens": 0,
    "object-curly-newline": 0,
    "implicit-arrow-linebreak": 0,
    "operator-linebreak": 0,
    "eslint-comments/no-unlimited-disable": 0,
    "no-param-reassign": 2,
    "space-before-function-paren": 0,
    "import/extensions": 0,
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    "import/resolver": {
      node: { extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"] },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".d.ts"],
    },
    polyfills: ["fetch", "Promise", "URL", "object-assign"],
  },
  parserOptions,
};
