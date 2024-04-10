import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join('src/styles')],
        prependData: `@import "variables.scss";`
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-5ae581681d8842d3920213d40f223944.r2.dev',
                port: '',
                pathname: '/**'
            }
        ]
    },
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ['ru-RU'],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: 'ru-RU',
    }
};

export default nextConfig;
