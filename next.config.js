const withCSS = require('@zeit/next-css');

const nextConfig = {
  env: {
    DESSERT_GRAPHQL_URL: process.env.DESSERT_GRAPHQL_URL,
    DESSERT_GHOST_URL: process.env.DESSERT_GHOST_URL,
    DESSERT_GHOST_KEY: process.env.DESSERT_GHOST_KEY,
  },
};

module.exports = withCSS(nextConfig);
