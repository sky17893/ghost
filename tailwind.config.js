/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // 'base' 대신 'class' 전략을 사용
    }),
  ],
}

