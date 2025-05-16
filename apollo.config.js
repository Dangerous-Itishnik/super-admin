import 'dotenv/config';

const config = {
    service: {
        endpoint: {
            url: 'https://inctagram.work/api/v1/graphql',
            skipSSLValidation: true,
        },
    },
};

export default config;
