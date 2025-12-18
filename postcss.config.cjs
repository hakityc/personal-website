const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    'postcss-pxtorem': pxtorem({
      rootValue: 32,
      propList: ['*'],
    }),
  },
};


