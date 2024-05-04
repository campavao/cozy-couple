"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant='ghost'
      className='inline-block'
      onClick={() => router.back()}
    >
      Back
    </Button>
  );
}
