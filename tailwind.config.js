/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'hsl(270,75%, 75%)',
          DEFAULT: 'hsl(270, 75%, 50%)',
          dark: 'hsl(270,75%, 25%)',
        },
        background: {
          lightextreme: 'hsl(0, 0%, 60%)',
          light: 'hsl(0, 0%, 30%)',
          DEFAULT: 'hsl(0, 0%, 20%)',
        },
      },
    },
  },
  plugins: [],
};
