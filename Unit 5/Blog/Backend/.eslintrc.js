module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "jest": true,
    "cypress/globals": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "plugins": [
    "react", "cypress"
  ],
  "rules": {
    "indent": [
      "warn",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "warn",
      "double",
      { "allowTemplateLiterals": true }
    ],
    "semi": [
      "error",
      "never"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "warn",
    "no-unused-vars": "warn",
    "no-undef": "warn",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0
  }
}
