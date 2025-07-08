import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "imgs.search.brave.com",      // Brave Search
      "encrypted-tbn0.gstatic.com", // Google Images
      "encrypted-tbn1.gstatic.com",
      "encrypted-tbn2.gstatic.com",
      "encrypted-tbn3.gstatic.com",
      "tse1.mm.bing.net",           // Bing Images
      "tse2.mm.bing.net",
      "tse3.mm.bing.net",
      "tse4.mm.bing.net",
      "upload.wikimedia.org",       // Wikipedia
      "cdn.pixabay.com",            // Pixabay
      "images.unsplash.com",        // Unsplash (recomendado)
      "res.cloudinary.com"          // Cloudinary (si usás un CDN)
    ]
  }
};

export default nextConfig;
