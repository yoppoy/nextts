const defaultEnvValues = {
    SPACE_API_URL: 'https://api.spacex.land/graphql/'
};

module.exports = {
    env: {
        SPACEX_API_URL: process.env.SPACEX_API_URL || defaultEnvValues.SPACE_API_URL,
    },
};
