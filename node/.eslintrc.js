module.exports = {
    "extends": ["airbnb-base"],
    "plugins": [
      "prefer-import"
    ],
    "parser": "babel-eslint",
    rules: {
      "indent": ["error", "tab"],
      "no-tabs": 0,
      "linebreak-style": 0,
      "prefer-import/prefer-import-over-require": ["error"],
      "import/prefer-default-export": 0,
      "linebreak-style": 0,
      "no-underscore-dangle": 0,
      "no-undef": 0,
      "no-plusplus": 0,
      "prefer-destructuring": 0,
    }
  };
