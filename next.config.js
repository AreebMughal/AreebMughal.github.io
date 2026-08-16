/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  // GitHub Pages serves plain files, so every route needs its own index.html.
  trailingSlash: true,

  // `next export` has no image optimization server behind it.
  images: {
    unoptimized: true
  }
};
