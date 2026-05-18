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
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
