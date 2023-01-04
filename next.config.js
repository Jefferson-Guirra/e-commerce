/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ["books.google.com"]
  }
}

module.exports =  nextConfig



