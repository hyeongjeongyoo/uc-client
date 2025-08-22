import { defineConfig } from "@chakra-ui/react";

const customTheme = {
  colors: {
    blue: {
      50: '#EDF2FA',
      100: '#DBE4F5',
      200: '#B7CBEB',
      300: '#93B2E1',
      400: '#6F99D7',
      500: '#267987',
      600: '#3B63AA',
      700: '#2C4A80',
      800: '#1E3255',
      900: '#0F192B'
    }
  },
  breakpoints: {
    sm: "360px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
    "2xl": "1300px",
  }
} as const;

export default defineConfig(customTheme as any);
