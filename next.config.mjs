import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// initOpenNextCloudflareForDev only wires up Cloudflare bindings for local
// `next dev`. It boots a workerd process, which crashes a production build on
// Vercel's build image (workerd needs a newer glibc than that image ships).
// Guard it to development so neither the Vercel build nor the Cloudflare /
// OpenNext production build ever touches workerd; local `next dev` still gets
// its bindings.
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
