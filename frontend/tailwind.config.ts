import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily:{
      title: 'Allerta Stencil, sans-serif',
      text: 'Inter, sans-serif'
    },

    screens:{
      sm: '426px',
      md: '769px',
      lg: '1025px',
    },

    extend: {
      colors: {
        vr: {
          white: '#faf1e6',
          yellow: '#ffff17',
          green: '#17ff17',
          blue: '#178bff',
          black: '#0a0601'
        }
      },
    },
  },
  plugins: [],
};
export default config;
