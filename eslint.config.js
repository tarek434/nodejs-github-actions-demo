const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,

  // Node.js backend
  {
    files: ["src/index.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        process: "readonly",
        __dirname: "readonly",
        console: "readonly"
      }
    }
  },

  // Browser frontend
  {
    files: ["src/public/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
        setInterval: "readonly"
      }
    }
  }
];