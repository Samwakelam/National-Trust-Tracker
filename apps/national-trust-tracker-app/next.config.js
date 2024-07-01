/** @type {import('next').NextConfig} */

module.exports = {
    transpilePackages: ['@repo/eslint-config', '@repo/typescript-config'],

    async redirects() {
        return [
            {
                source: '/',
                destination: '/Membership',
                permanent: true,
            },
        ];
    },

    webpack: (config) => {
        config.resolve.fallback = {
            'mongodb-client-encryption': false,
            'aws4': false,
        };
        return config;
    },
};

//     config.node = {
//         fs: "empty"
//     };
//     config.resolve.alias = {
//         ...config.resolve.alias,
//         "@components": path.join(__dirname, "components"),
//         "@pages": path.join(__dirname, "pages"),
//         "@redux": path.join(__dirname, "redux"),
//         "@api": path.join(__dirname, "api")
//     };
