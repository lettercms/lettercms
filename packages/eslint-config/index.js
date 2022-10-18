module.exports = {
  extends: ["next", "turbo", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "semi": ["warn", "always"],
    "quotes": ["warn", "single"],
    "array-bracket-spacing": "error",
    "arrow-spacing": "error",
    "complexity": "off",
    "curly": "off",
    "@next/next/no-img-element": "off",
    "no-buffer-constructor": "error",
    "no-var": "error",
    "turbo/no-undeclared-env-vars": "off"
  }
};
