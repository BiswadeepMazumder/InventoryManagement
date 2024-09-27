"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

import useFetchLowStockItem from "@/hooks/useFetchLowStockItem";

import { PastOrder } from "@/components/dashboard/overview/PastOrder";
import { LowStock } from "@/components/dashboard/overview/LowStock";
import { CurrentOrder } from "@/components/dashboard/overview/CurrentOrder";
import { UpcomingOrder } from "@/components/dashboard/overview/UpcomingOrder";
import { RecentOrders } from "@/components/dashboard/overview/RecentOrders";
import { Statistics } from "@/components/dashboard/overview/Statistics";
import { ItemStock } from "@/components/dashboard/overview/ItemStock";
import { Suppliers } from "@/components/dashboard/overview/Suppliers";

export default function Page(): React.JSX.Element {
  const { items: lowStockItems, loading: lowStockLoading } =
    useFetchLowStockItem("user-id");
  console.log("[DEBUG] lowStockItems: ", lowStockItems, lowStockLoading);

  const lowStockItem = lowStockItems.length > 0 ? lowStockItems[0] : null;

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
        <LowStock
          sx={{ height: "100%" }}
          name={lowStockItem?.itemName ?? "-"}
          value={lowStockItem?.currentStock ?? 0}
        />
      </Grid>

      <Grid size={{ lg: 8, md: 8, xs: 12 }}>
        <Statistics
          chartSeries={[
            {
              name: "This year",
              data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
            },
            {
              name: "Last year",
              data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
            },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid size={{ lg: 4, md: 4, xs: 12 }}>
        <Suppliers
          suppliers={[
            {
              id: "PRD-001",
              name: "Supplier 1",
              image: "https://avatar.iran.liara.run/public/boy?username=Ash",
              address: "Supplier address",
            },
            {
              id: "PRD-002",
              name: "Supplier 2",
              image: "https://avatar.iran.liara.run/public/girl?username=Lee",
              address: "Supplier address",
            },
            {
              id: "PRD-003",
              name: "Supplier 3",
              image: "https://avatar.iran.liara.run/public/boy?username=Jay",
              address: "Supplier address",
            },
            {
              id: "PRD-004",
              name: "Supplier 4",
              image: "https://avatar.iran.liara.run/public/girl?username=Ash",
              address: "Supplier address",
            },
            {
              id: "PRD-005",
              name: "Supplier 5",
              image: "https://avatar.iran.liara.run/public/girl?username=Kim",
              address: "Supplier address",
            },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid size={{ lg: 8, md: 8, xs: 12 }}>
        <RecentOrders
          orders={[
            {
              id: "ORD-001",
              price: "$473.18",
              orderName: "Order 1",
              status: "pending",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-002",
              price: "$665.86",
              orderName: "Order 2",
              status: "completed",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-003",
              price: "$322.23",
              orderName: "Order 3",
              status: "refunded",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-004",
              price: "$11.94",
              orderName: "Order 4",
              status: "pending",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-005",
              price: "$94.39",
              orderName: "Order 5",
              status: "completed",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-006",
              price: "$787.08",
              orderName: "Order 6",
              status: "completed",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid size={{ lg: 4, md: 4, xs: 12 }}>
        <ItemStock
          chartSeries={[63, 15, 22]}
          labels={["Category 1", "Category 2", "Category 3"]}
          sx={{ height: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
