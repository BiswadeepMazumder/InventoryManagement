import * as React from "react";
import type { Metadata } from "next";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

import { config } from "@/config";
import { Budget } from "@/components/dashboard/overview/budget";
import { TasksProgress } from "@/components/dashboard/overview/tasks-progress";
import { TotalCustomers } from "@/components/dashboard/overview/total-customers";
import { TotalProfit } from "@/components/dashboard/overview/total-profit";

export const metadata = {
  title: `Overview | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <Budget diff={12} trend="up" sx={{ height: "100%" }} value="$24k" />
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalCustomers
          diff={16}
          trend="down"
          sx={{ height: "100%" }}
          value="1.6k"
        />
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TasksProgress sx={{ height: "100%" }} value={75.5} />
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalProfit sx={{ height: "100%" }} value="$15k" />
      </Grid>
      <Grid size={{ lg: 8, xs: 12 }}></Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}></Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}></Grid>
      <Grid size={{ lg: 6, md: 12, xs: 12 }}></Grid>
    </Grid>
  );
}
