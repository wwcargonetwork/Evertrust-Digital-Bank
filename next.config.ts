import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.kreditbee.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'defisolutions.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img-2.outlookindia.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.bankerslife.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'crestmontrealty.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'doi.sc.gov',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['recharts', 'd3-shape', 'd3-path'],
};

export default nextConfig;
