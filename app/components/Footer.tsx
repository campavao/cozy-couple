"use client";
import { usePathname } from "next/navigation";

export function Footer({ isHome }: { isHome?: boolean }) {
  const pathname = usePathname();

  if (pathname === "/home" && !isHome) {
    return;
  }

  return (
    <div className='flex flex-wrap justify-center gap-4 p-4'>
      <a href='/home'>Home</a>
      <a href='/subscription'>Pricing</a>
      <a href='/contact'>Contact Us</a>
      <a href='/tos'>Terms of Service</a>
      <a href='/privacy'>Privacy Policy</a>
    </div>
  );
}
