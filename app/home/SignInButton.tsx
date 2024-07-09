"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SignInButton = ({ variant }: { variant?: any }) => {
  const router = useRouter();
  return (
    <Button variant={variant} onClick={() => router.push("/")}>
      Sign in
    </Button>
  );
};
