module.exports = {
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize:{
        'md':'25px',
        'cmd':'20px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
