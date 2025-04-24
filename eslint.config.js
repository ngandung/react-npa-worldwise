import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Apply React plugin defaults first
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],

  // Then apply your custom config so it can override the above
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
