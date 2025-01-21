import baseConfig, { restrictEnvAccess } from "@linkup/eslint-config/base";
import nextjsConfig from "@linkup/eslint-config/nextjs";
import reactConfig from "@linkup/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
  {
    rules: {
      "@typescript-eslint/only-throw-error": "off",
    },
  },
];
