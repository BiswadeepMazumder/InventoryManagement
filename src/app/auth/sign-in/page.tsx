import React from "react";
import type { Metadata } from "next";

import { config } from "@/config";
import { GuestGuard } from "@/components/auth/GuestGuard";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = {
  title: `Sign in | Auth | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <GuestGuard>
      <SignInForm />
    </GuestGuard>
  );
}
