import daisyui from 'daisyui'
import formsPlugin from '@tailwindcss/forms'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "figma-red": "#FC4747",
        "figma-dark-blue": "#10141E",
        "figma-greyish-blue": "#5A698F",
        "figma-semi-dark-blue": "#161D2F",
        "figma-white": "#FFFFFF"
      },
      screens: {
        "phone": "375px",
        "tablet": "768px",
        "desktop": "1440px"
      }
    },
  },
  plugins: [daisyui,formsPlugin],
}
