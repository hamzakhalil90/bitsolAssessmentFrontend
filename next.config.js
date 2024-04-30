/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.NEXT_PUBLIC_ANALYZE_BUNDLE === 'true',
});

module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
            },
        ],
    },
    compress: true,
    async redirects() {
        return [];
    },
});
