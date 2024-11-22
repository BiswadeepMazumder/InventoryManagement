import React from "react";
import type { Metadata } from "next";

import { config } from "@/config";
import { GuestGuard } from "@/components/auth/GuestGuard";
import { Layout } from "@/components/auth/layout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata = {
  title: `Sign up | Auth | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <SignUpForm />
      </GuestGuard>
    </Layout>
  );
}
