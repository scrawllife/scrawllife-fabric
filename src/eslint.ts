"use strict";
// eslint ts es
import fs from "fs";
import path from "path";

const parserOptions = {
  project: "./tsconfig.json",
};

if (!fs.existsSync(path.join(process.env.PWD || ".", "./tsconfig.json"))) {
  Object.assign(parserOptions, {
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
  });
}

export = {
  extends: [
    "airbnb-base/legacy",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint", "eslint-comments", "jest", "unicorn"],
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
    "import/no-unresolved": [2, { ignore: ["^@/"] }],
    "import/no-extraneous-dependencies": [
      2,
      {
        optionalDependencies: true,
        devDependencies: [
          "**/tests/**.js",
          "/mock/**/**.js",
          "**/**.test.js",
          "**/_mock.{ts,js}",
        ],
      },
    ],

    "linebreak-style": 0,
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": [0, "camel-case"],
    // Use function hoisting to improve code readability
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "off",
      { allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    "@typescript-eslint/explicit-member-accessibility": 0,
    "import/no-cycle": 0,
    // Conflict with prettier
    "arrow-body-style": ["error", "as-needed"],
    "object-curly-newline": 0,
    "implicit-arrow-linebreak": 0,
    "operator-linebreak": 0,
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    "import/resolver": { node: { extensions: [".js", ".ts"] } },
    polyfills: ["fetch", "Promise", "URL", "object-assign"],
  },
  parserOptions,
};
