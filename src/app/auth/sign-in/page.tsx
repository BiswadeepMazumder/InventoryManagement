import * as React from "react";
import type { Metadata } from "next";

import { config } from "@/config";
import { GuestGuard } from "@/components/auth/GuestGuard";
import { Layout } from "@/components/auth/layout";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = {
  title: `Sign in | Auth | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <SignInForm />
      </GuestGuard>
    </Layout>
  );
}
