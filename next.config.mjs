/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const uppercaseLetterRedirects = alphabet.map((letter) => ({
      source: `/starting-with/${letter.toUpperCase()}`,
      destination: `/starting-with/${letter}`,
      permanent: true,
    }));

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
      ...uppercaseLetterRedirects,
    ];
  },
};

export default nextConfig;
