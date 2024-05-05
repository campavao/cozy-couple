"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BackButton() {
  const pathname = usePathname();

  const url = pathname.substring(0, pathname.lastIndexOf("/"));

  return (
    <Link className='inline-block' href={url.length === 0 ? "/" : url}>
      Back
    </Link>
  );
}
