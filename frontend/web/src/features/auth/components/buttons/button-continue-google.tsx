"use client";

import { authClient } from "@packages/client/auth";
import { Button } from "@packages/ui/button";
import { useMutation } from "@tanstack/react-query";
import { FcGoogle } from "react-icons/fc";

export function ButtonContinueGoogle() {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) throw error;

      return data;
    },
  });

  const handleSignup = () => mutate();

  return (
    <Button variant="outline" onClick={handleSignup}>
      <FcGoogle className="size-5" />
      Continue with Google
    </Button>
  );
}
