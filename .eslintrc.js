module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  env: {
    jest: true
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "no-underscore-dangle": "off",
    "react/destructuring-assignment": "off",
    "no-param-reassign": "off",
    "no-case-declarations": "off",
  },
  globals: {
    fetch: false
  }
};
