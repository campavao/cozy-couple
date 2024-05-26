"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { RefAttributes } from "react";

export function Login({
  isSignout,
  signInText = "Login",
  variant = "default",
  ...rest
}: {
  isSignout?: boolean;
  signInText?: string;
} & ButtonProps &
  RefAttributes<HTMLButtonElement>) {
  const handleLogin = async () => {
    if (isSignout) {
      await signOut();
    } else {
      await signIn("google");
    }
  };

  return (
    <Button {...rest} onClick={handleLogin}>
      {isSignout ? "Sign out" : signInText}
    </Button>
  );
}
