import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join("src/styles")],
    prependData: `@import "variables.scss";`,
  },
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.demod.uz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-5ae581681d8842d3920213d40f223944.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["ru-RU"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "ru-RU",
  },
  async redirects() {
    return [
      {
        source: "/:path((?!login$).*)",
        missing: [
          {
            type: "cookie",
            key: "accessToken",
          },
        ],
        permanent: false,
        destination: "/login",
      },
    ];
  },
};

export default nextConfig;
