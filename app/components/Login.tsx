"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export function Login({ isSignout }: { isSignout?: boolean }) {
  const handleLogin = async () => {
    if (isSignout) {
      await signOut();
    } else {
      await signIn("google");
    }
  };

  return (
    <Button onClick={handleLogin}>{isSignout ? "Sign out" : "Login"}</Button>
  );
}
