/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '5letterwords.me',
          },
        ],
        destination: 'https://www.5letterwords.me/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
