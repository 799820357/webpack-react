module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "jquery": true,
      "node": true,
      "amd": true,
      "es6": true,
      "commonjs": true
  },
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
      "no-empty": [
          "error",
          {
              "allowEmptyCatch": true
          }
      ],
      "no-unused-vars": "off",
      "react/jsx-uses-react": 2,
      "no-console": "off",
      "no-func-assign": "off",
      "no-useless-escape": "off"
  }
};