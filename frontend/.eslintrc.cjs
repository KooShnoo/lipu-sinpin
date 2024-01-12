/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "only-warn",
  ],
  rules: {
    "no-undef": [
      "warn",
    ],
    semi: [
      "warn",
      "always",
    ],
    camelcase: "off",
    indent: [
      "warn",
      2,
    ],
    "space-before-function-paren": [
      "warn",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "comma-dangle": [
      "warn",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^[_]",
      },
    ],
  },
  overrides: [
    {
      files: [
        "*.ts",
        "*.mts",
        "*.cts",
        "*.tsx",
      ],
      rules: {
        "no-undef": "off",
      },
    },
  ],
};