module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    // Ensure consistent CSS across browsers
    autoprefixer: {
      flexbox: 'no-2009',
    },
    // Fix flexbox bugs consistently
    'postcss-flexbugs-fixes': {},
  },
};
