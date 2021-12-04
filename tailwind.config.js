module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor:{
        'primary': '#23243D',
        'secondary': '#383A59',
        'rating': '#F1E93A',
        'white': '#F5F5F1'},
      textColor: {
        'primary': '#23243D',
        'secondary': '#383A59',
        'rating': '#F1E93A',
        'white': '#F5F5F1'
      },
      borderColor: {
        'primary': '#23243D',
        'secondary': '#383A59',
        'rating': '#F1E93A',
        'white': '#F5F5F1',}
    },
  },
  variants: {
    extend: {
      transform: ['group-hover'],
    },
  },
  plugins: [],
}
