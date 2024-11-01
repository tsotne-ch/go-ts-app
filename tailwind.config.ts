/** @type {import('tailwindcss').Config} */
export default {
  content: ["./resources/**/*.{html,templ,js,ts}", 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin')],
}

