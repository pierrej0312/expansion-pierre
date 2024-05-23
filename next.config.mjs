import withTM from 'next-transpile-modules';

const withTranspileModules = withTM(['gsap']);

/** @type {import('next').NextConfig} */
const nextConfig = withTranspileModules({
    // Autres configurations de Next.js ici
});

export default nextConfig;
