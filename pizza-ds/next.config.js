/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ["www.google.com","pizzads.s3.amazonaws.com"],
  },
}

module.exports = nextConfig
