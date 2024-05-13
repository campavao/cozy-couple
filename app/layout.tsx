import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

import { Urbanist } from "next/font/google";

import "./globals.css";

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
      <body className={font.className}>
        <main className='sm:m-8 m-4'>{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
