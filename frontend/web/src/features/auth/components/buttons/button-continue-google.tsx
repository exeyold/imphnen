"use client";

import { Button } from "@packages/ui/button";
import { authClient } from "@packages/utils/auth";
import { useMutation } from "@tanstack/react-query";

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

  return <Button onClick={handleSignup}>Continue with Google</Button>;
}
