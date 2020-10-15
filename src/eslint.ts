/** @format */

import * as path from "path";
import * as fs from "fs";

let parserOptions: {
  tsconfigRootDir?: string;
  project?: string;
  createDefaultProgram?: boolean;
} = {
  project: "./tsconfig.json",
};

if (!fs.existsSync(path.join(process.env.PWD || ".", "./tsconfig.json"))) {
  parserOptions = {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
    /**
     * parserOptions.createDefaultProgram
     * Default .false
     * This option allows you to request that when the setting is specified,
     * files will be allowed when not included in the projects defined by the provided files.
     * Using this option will incur significant performance costs.
     * This option is primarily included for backwards-compatibility.
     * See the project section above for more information.projecttsconfig.json
     */
    createDefaultProgram: true,
  };
}

module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "prettier",
    "prettier/@typescript-eslint",
  ],
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
    polyfills: ["fetch", "Promise", "URL", "object-assign"],
  },
  parserOptions,
};
