import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rupsha Das — Full-Stack Developer",
    short_name: "Rupsha Das",
    description: "Portfolio of Rupsha Das, Full-Stack Developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ed",
    theme_color: "#faf6ed",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
