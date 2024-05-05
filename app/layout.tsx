import type { Metadata } from "next";

import { Urbanist } from "next/font/google";

import "./globals.css";

const font = Urbanist({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cozy Couple",
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
      </body>
    </html>
  );
}
