import type { Config } from 'tailwindcss';
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  darkMode: 'class', // ✅ تفعيل دعم الوضع الداكن

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Satoshi"', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "2xsm": "375px",
        xsm: "425px",
        "3xl": "2000px",
      },
  
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Adding support for forms
    require('tailwindcss-rtl'), // Adding RTL support
  ],
} satisfies Config;




