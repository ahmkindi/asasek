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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`bg-mud ${mainFont.className}`} >
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
