import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

import localFont from 'next/font/local'

const mainFont = localFont({
  src: [
    {
      path: './fonts/TheYearofHandicrafts-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/TheYearofHandicrafts-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/TheYearofHandicrafts-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/TheYearofHandicrafts-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/TheYearofHandicrafts-Black.otf',
      weight: '800',
      style: 'normal',
    },
  ],
})




export const metadata: Metadata = {
  title: "نــــدوة الشيــــخ العلامــــة",
  description: "نــــدوة الشيــــخ العلامــــة",
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicons/apple-touch-icon.png',
  },
  manifest: '/favicons/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preload" href="/mud-bg.webp" as="image" />
        <link rel="preload" href="/sand-bg.webp" as="image" />
      </head>
      <body className={`bg-mud ${mainFont.className}`} >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
