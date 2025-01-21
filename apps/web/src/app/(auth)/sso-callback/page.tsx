import type { HandleOAuthCallbackParams } from "@clerk/types";

import SSOCallback from "~/app/_components/auth/sso-callback";

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams;
}

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <SSOCallback searchParams={searchParams} />
    </div>
  );
}
