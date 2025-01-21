"use client";

import { UserButton } from "@clerk/nextjs";

export function CustomUserButton() {
  return (
    <header>
      <UserButton showName />
    </header>
  );
}
