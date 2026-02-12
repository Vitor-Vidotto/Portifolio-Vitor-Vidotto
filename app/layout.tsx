import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Vitor Vidotto",
  description: "Portifólio Digital",
};

import Navbar from "@/components/Navbar";
import Scene from "@/components/Scene";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-purple-500/30`}
      >
        <Navbar />
        <div className="relative z-0">
          <div className="fixed inset-0 pointer-events-none">
            <Scene />
          </div>
          <div className="relative z-10 w-full overflow-x-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
