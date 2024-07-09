import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "./components/Footer";
import { MobileMenu } from "./components/mobile-menu/MobileMenu";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Urbanist } from "next/font/google";
import { isUserSubscribed } from "./api/apiUtils";

import "./globals.css";

const font = Urbanist({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlipTrack",
  description: "Management software for buying and selling couches",
  metadataBase: new URL("https://fliptrack.app"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSubscribed = await isUserSubscribed();
  return (
    <html lang='en'>
      <body
        className={`${font.className} bg-gradient-to-b from-darkest-blue to-darker-blue min-h-screen relative`}
      >
        <main className='sm:pb-0 sm:p-8 p-4 pb-0 min-h-[80vh]'>{children}</main>
        <div className='hidden sm:block'>
          <Footer />
        </div>
        <div className='block sm:hidden'>{isSubscribed && <MobileMenu />}</div>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
