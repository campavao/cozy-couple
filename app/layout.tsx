import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

import { Urbanist } from "next/font/google";

import "./globals.css";
import { Footer } from "./components/Footer";

const font = Urbanist({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlipTrack",
  description: "Management software for buying and selling couches",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${font.className} bg-gradient-to-b from-darkest-blue to-darker-blue min-h-screen relative`}
      >
        <main className='sm:pb-0 sm:p-8 p-4 pb-0 min-h-[80vh]'>{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
