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
  async redirects() {
    return [
      // Redirect from old post URLs to new blog structure
      {
        source: '/posts/:slug',
        destination: '/blog/posts/:slug',
        permanent: true, // This is a 308 redirect
      },
      {
        source: '/the-importance-of-video-production-services',
        destination: '/blog/posts/the-importance-of-video-production-services',
        permanent: true,
      },
      // Add more specific redirects as needed
    ];
  },
};

export default withMDX(nextConfig);
