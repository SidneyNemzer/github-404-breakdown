module.exports = {
  extends: "standard",
  env: { browser: true, "jest/globals": true },
  plugins: ["standard", "promise", "jest"],
  rules: {
    "valid-typeof": "off",
    "spaced-comment": "off",
    "space-in-parens": "off",
    quotes: "off",
    semi: "off",
    "space-before-function-paren": "off"
  }
};
