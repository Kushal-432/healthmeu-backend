module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "off" // allow console.log in backend
  },
};
