import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {},
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  // props-typeを無効化する。pluginReact.configs.flat.recommendedの前に書くと上書きされて無効化されるので、後で記載
  {
    rules: {
      "react/prop-types": "off",
      "no-unused-vars": "off",
    },
  },
]);
