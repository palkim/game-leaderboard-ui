import TopNav from "@/app/ui/topnav";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
        bg-[#17151e] bg-no-repeat 
        [background-image:radial-gradient(ellipse_100%_60%_at_top_center,_#291156,_#291156_60%,_transparent_60%)] 
        [background-size:100%_50%] [background-position:top_center] h-screen`}
      >
        <TopNav />
        <div className="flex flex-col justify-center items-center min-h-screen w-full">{children}</div>
      </body>
    </html>
  );
}
