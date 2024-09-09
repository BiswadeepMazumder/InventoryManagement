import * as React from "react";
import type { Metadata } from "next";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

import { config } from "@/config";
import { PastOrder } from "@/components/dashboard/overview/past-order";
import { LowStock } from "@/components/dashboard/overview/low-stock";
import { CurrentOrder } from "@/components/dashboard/overview/current-order";
import { UpcomingOrder } from "@/components/dashboard/overview/upcoming-order";

export const metadata = {
  title: `Overview | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <CurrentOrder
          diff={16}
          trend="up"
          sx={{ height: "100%" }}
          value="7,278"
        />
      </Grid>

      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <UpcomingOrder
          diff={29}
          trend="down"
          sx={{ height: "100%" }}
          value="4,502"
        />
      </Grid>

      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <PastOrder diff={12} trend="up" sx={{ height: "100%" }} value="6,452" />
      </Grid>

      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <LowStock sx={{ height: "100%" }} name={"Ravioli"} value={22} />
      </Grid>

      <Grid size={{ lg: 8, xs: 12 }}></Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}></Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}></Grid>
      <Grid size={{ lg: 6, md: 12, xs: 12 }}></Grid>
    </Grid>
  );
}
