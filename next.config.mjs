import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfolio.lyfar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'new.lyfar.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Note: Redirects are handled via Cloudflare Page Rules
  // async redirects() {
  //   return [
  //     // Domain redirect: new.lyfar.com → www.lyfar.com
  //     {
  //       source: '/:path*',
  //       has: [{ type: 'host', value: 'new.lyfar.com' }],
  //       destination: 'https://www.lyfar.com/:path*',
  //       permanent: true,
  //     },
  //     // Redirect from old post URLs to new blog structure
  //     {
  //       source: '/posts/:slug',
  //       destination: '/blog/posts/:slug',
  //       permanent: true,
  //     },
  //     {
  //       source: '/the-importance-of-video-production-services',
  //       destination: '/blog/posts/the-importance-of-video-production-services',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default withMDX(nextConfig);
