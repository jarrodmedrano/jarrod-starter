const { theme } = require('../../packages/app/design/tailwind/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    '../../packages/**/*.{js,jsx,ts,tsx}',
    './app/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    ...theme,
  },
  extends: 'ui/tailwind.config',
}
