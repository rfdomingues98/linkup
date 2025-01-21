"use client";

import React from "react";
import { useSignIn } from "@clerk/nextjs";

import { Button } from "@linkup/ui/button";

import { catchClerkError } from "~/lib/utils";
import { Icons } from "../icons";

const OAuthLogin: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean | null>(null);
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  async function oauthSignIn() {
    if (!signInLoaded) return null;
    try {
      setIsLoading(true);
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      setIsLoading(false);
      catchClerkError(error);
    }
  }
  return (
    <Button
      aria-label={`Continue with Google`}
      variant="outline"
      className="flex h-16 w-full transform cursor-pointer select-none items-center justify-center rounded-xl border-[#333333] bg-transparent px-3 py-5 text-base text-white transition-transform hover:bg-transparent hover:text-white active:scale-95"
      onClick={() => void oauthSignIn()}
      disabled={isLoading !== null}
    >
      {isLoading ? (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      ) : (
        <Icons.googleColor className="mr-2 h-4 w-4" aria-hidden="true" />
      )}
      Continue with Google
    </Button>
  );
};

export default OAuthLogin;
