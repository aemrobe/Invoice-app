const config = {
  plugins: {
    "postcss-functions": {
      functions: {
        rem: (value) => {
          const num = parseFloat(value);
          return `${num / 16}rem`;
        },
      },
    },
    "@tailwindcss/postcss": {},
  },
};

export default config;
