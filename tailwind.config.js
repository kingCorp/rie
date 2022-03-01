module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
