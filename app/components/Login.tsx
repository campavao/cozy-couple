"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export function Login({
  isSignout,
  signInText = "Login",
}: {
  isSignout?: boolean;
  signInText?: string;
}) {
  const handleLogin = async () => {
    if (isSignout) {
      await signOut();
    } else {
      await signIn("google");
    }
  };

  return (
    <Button variant='default' onClick={handleLogin}>
      {isSignout ? "Sign out" : signInText}
    </Button>
  );
}
