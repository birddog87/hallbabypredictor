import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadataBase - replace 'YOUR_SITE_URL' with your actual domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Example: Use env var or fallback

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Add this line
  title: {
    default: "Baby Predictions!", // Default title
    template: "%s | Baby Predictions", // Title template for pages
  },
  description: "Fun predictions for the upcoming baby Hall!", // Updated description
  openGraph: {
    title: "Baby Predictions!",
    description: "Fun predictions for the upcoming baby Hall!",
    url: siteUrl,
    siteName: "Baby Hall Predictions",
    images: [
      {
        url: '/og-image.png', // Path relative to metadataBase
        width: 1200,
        height: 630,
        alt: 'Baby Hall Predictions Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Baby Predictions!",
    description: "Fun predictions for the upcoming baby Hall!",
    // creator: '@yourTwitterHandle', // Optional: Add your Twitter handle
    images: ['/twitter-image.png'], // Path relative to metadataBase
  },
  // Add icons if needed, referencing files in /public
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-grow">{children}</main>
        <footer className="footer p-4 text-center text-sm text-gray-500">
          Crafted by{" "}
          <Link
            href="https://HAMMND.COM"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            HAMMND ✨<span className="inline-block ml-1">↗</span>
          </Link>
        </footer>
      </body>
    </html>
  );
}
