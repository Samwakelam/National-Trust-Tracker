/** @type {import('next').NextConfig} */

const nextConfig = {
    transpilePackages: ['@repo/eslint-config', '@repo/typescript-config'],
};

module.exports = nextConfig;
