import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  plugins: {
    "@typescript-eslint": tseslint.plugin,
    "react-compiler": "react-compiler",
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { project: true },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "react-compiler/react-compiler": "error",
  },
  ignores: ["**/*.{cjs,js}"],
});
