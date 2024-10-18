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
import useFetchSuppliers from "@/hooks/useFetchSuppliers";
import useFetchOrders from "@/hooks/useFetchOrders";

export default function Page(): React.JSX.Element {
  const { items: lowStockItems, loading: lowStockLoading } =
    useFetchLowStockItem("user-id");
  const { suppliers, loading: suppliersLoading } = useFetchSuppliers("user-id");
  const { orders, loading: ordersLoading } = useFetchOrders("user-id");

  const createRandomImage = (name: string) => {
    return `https://avatar.iran.liara.run/public/boy?username=${name}`;
  };

  const suppliersData = suppliers.map((supplier) => ({
    id: supplier.supplierId,
    name: supplier.supplierName,
    image: createRandomImage(supplier.supplierName),
    address: supplier.supplierCity,
  }));

  const ordersData = orders.map((order) => ({
    id: order.orderId,
    amount: order.orderAmount,
    orderName: order.orderName,
    status: order.orderStatus,
    createdAt: dayjs(order.orderDate).toDate(),
  }));

  console.log("ordersData", ordersData);

  const lowStockItem = lowStockItems.length > 0 ? lowStockItems[0] : null;

  return (
    <Grid container spacing={3}>
      {/* Current Order */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <CurrentOrder
          diff={16}
          trend="up"
          sx={{ height: "100%" }}
          value="7,278"
        />
      </Grid>

      {/* Upcoming Order */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <UpcomingOrder
          diff={29}
          trend="down"
          sx={{ height: "100%" }}
          value="4,502"
        />
      </Grid>

      {/* Past Order */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <PastOrder diff={12} trend="up" sx={{ height: "100%" }} value="6,452" />
      </Grid>

      {/* Low Stock */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <LowStock
          sx={{ height: "100%" }}
          name={lowStockItem?.itemName ?? "-"}
          value={lowStockItem?.currentStock ?? 0}
        />
      </Grid>

      {/* Statistics */}
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

      {/* Suppliers */}
      <Grid size={{ lg: 4, md: 4, xs: 12 }}>
        <Suppliers suppliers={suppliersData} sx={{ height: "100%" }} />
      </Grid>

      {/* Recent Orders */}
      <Grid size={{ lg: 8, md: 8, xs: 12 }}>
        <RecentOrders orders={ordersData} sx={{ height: "100%" }} />
      </Grid>

      {/* Item Stock */}
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
