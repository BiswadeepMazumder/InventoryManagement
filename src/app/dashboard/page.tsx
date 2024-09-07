import * as React from "react";
import type { Metadata } from "next";

import { config } from "@/config";

export const metadata = {
  title: `Overview | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <div></div>;
}
