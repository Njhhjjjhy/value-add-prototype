import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoreHarvest - Kumamoto investment pitch",
  description: "A full-viewport investment pitch experience for MoreHarvest.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MoreHarvest",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#F9F9F9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Inject the Mapbox public token onto window so the embedded
     map-prototype iframe can read it via window.parent.
     __GKTK_MAPBOX_ACCESS_TOKEN. Set in the root layout so every page
     (the main orchestrator AND the playground prototype preview) has
     it available before the iframe loads. The token is a public pk.*
     token; keeping it out of the embedded HTML lets GitHub secret
     scanning pass on commits to this repo. */
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  return (
    <html lang="en">
      <head>
        {mapboxToken && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__GKTK_MAPBOX_ACCESS_TOKEN = ${JSON.stringify(mapboxToken)};`,
            }}
          />
        )}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
