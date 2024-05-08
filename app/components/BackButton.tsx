"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BackButton() {
  const pathname = usePathname();

  const url = pathname.substring(0, pathname.lastIndexOf("/"));

  return (
    <Link
      title='go back'
      className='inline-block'
      href={url.length === 0 ? "/" : url}
    >
      <ArrowLeft />
    </Link>
  );
}
