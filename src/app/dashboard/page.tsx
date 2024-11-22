"use client";

import React from "react";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

import useFetchLowStockItem from "@/hooks/useFetchLowStockItem";
import useFetchSuppliers from "@/hooks/useFetchSuppliers";
import useFetchOrders from "@/hooks/useFetchOrders";
import useFetchUpcomingOrders from "@/hooks/useFetchUpcomingOrders";
import useFetchPastOrders from "@/hooks/useFetchPastOrders";
import useFetchItems from "@/hooks/useFetchItems";

import { PastOrder } from "@/components/dashboard/overview/PastOrder";
import { LowStock } from "@/components/dashboard/overview/LowStock";
import { CurrentOrder } from "@/components/dashboard/overview/CurrentOrder";
import { UpcomingOrder } from "@/components/dashboard/overview/UpcomingOrder";
import { RecentOrders } from "@/components/dashboard/overview/RecentOrders";
import { Statistics } from "@/components/dashboard/overview/Statistics";
import { ItemStock } from "@/components/dashboard/overview/ItemStock";
import { Suppliers } from "@/components/dashboard/overview/Suppliers";

export default function Page(): React.JSX.Element {
  // Fetch order data
  const { orders, loading: ordersLoading } = useFetchOrders("user-id");
  const { orders: upcomingOrders, loading: upcomingOrdersLoading } =
    useFetchUpcomingOrders("user-id");
  const { orders: pastOrders, loading: pastOrdersLoading } =
    useFetchPastOrders("user-id");
  const { items: lowStockItems, loading: lowStockLoading } =
    useFetchLowStockItem("user-id");

  // Fetch supplier data
  const { suppliers, loading: suppliersLoading } = useFetchSuppliers("user-id");

  // Fetch item data
  const { items, loading: itemsLoading } = useFetchItems("user-id");

  const loading =
    ordersLoading ||
    upcomingOrdersLoading ||
    pastOrdersLoading ||
    lowStockLoading ||
    suppliersLoading ||
    itemsLoading;

  const createRandomImage = (name: string) => {
    return `https://avatar.iran.liara.run/public/boy?username=${name}`;
  };

  // get only first 5 suppliers and map to the format that Suppliers component needs
  const suppliersSliced = suppliers.slice(0, 6);
  const suppliersData = suppliersSliced.map((supplier) => ({
    id: supplier.supplierId,
    name: supplier.supplierName,
    image: createRandomImage(supplier.supplierName),
    address: supplier.supplierCity,
  }));

  // get only first 5 orders and map to the format that Statistics component needs
  const ordersSliced = orders.slice(0, 7);
  const ordersData = ordersSliced.map((order) => ({
    id: order.orderId,
    amount: order.orderAmount,
    orderName: order.orderName,
    status: order.orderStatus,
    createdAt: dayjs(order.orderDate).toDate(),
  }));

  // Count orders by month in this year and return to list, if it doesn't exist, return 0
  const orderCountByMonthThisYear = Array(12).fill(0);
  orders.forEach((order) => {
    const orderDate = dayjs(order.orderDate);
    if (orderDate.year() === dayjs().year()) {
      const month = orderDate.month();
      orderCountByMonthThisYear[month]++;
    }
  });

  // Count orders by month in last year and return to list, if it doesn't exist, return 0
  const orderCountByMonthLastYear = Array(12).fill(0);
  orders.forEach((order) => {
    const orderDate = dayjs(order.orderDate);
    if (orderDate.year() === dayjs().year() - 1) {
      const month = orderDate.month();
      orderCountByMonthLastYear[month]++;
    }
  });

  console.log("[DEBUG] orderCountByMonth", orderCountByMonthThisYear);
  console.log("[DEBUG] orderCountByMonthLastYear", orderCountByMonthLastYear);

  const statisticsData = [
    {
      name: "This year",
      data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20], // [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
    },
    {
      name: "Last year",
      data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13], // [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
    },
  ];

  const lowStockItem = lowStockItems.length > 0 ? lowStockItems[0] : null;

  // Get item categories for the ItemStock chart
  const itemCategories = items.map((item) => item.categoryCode);
  console.log("[DEBUG] itemCategories", itemCategories);

  // Get unique item categories
  const uniqueItemCategories = [...new Set(itemCategories)];
  console.log("[DEBUG] uniqueItemCategories", uniqueItemCategories);

  // Get the count of each item category
  const itemCounts = uniqueItemCategories.map((category) => {
    return itemCategories.filter((item) => item === category).length;
  });
  console.log("[DEBUG] itemCounts", itemCounts);

  // Get Percentage of each item category
  const totalItems = itemCategories.length;
  const itemPercentages = itemCounts.map((count) =>
    Math.round((count / totalItems) * 100),
  );
  console.log("[DEBUG] itemPercentages", itemPercentages);

  if (loading) {
    return <Grid>Loading...</Grid>;
  }

  return (
    <Grid container spacing={3}>
      {/* Current Order */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <CurrentOrder
          // diff={16}
          // trend="up"
          sx={{ height: "100%" }}
          value={orders.length.toString()}
        />
      </Grid>

      {/* Upcoming Order */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <UpcomingOrder
          // diff={29}
          // trend="down"
          sx={{ height: "100%" }}
          value={upcomingOrders.length.toString()}
        />
      </Grid>

      {/* Past Order */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <PastOrder
          // diff={12}
          // trend="up"
          sx={{ height: "100%" }}
          value={pastOrders.length.toString()}
        />
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
        <Statistics chartSeries={statisticsData} sx={{ height: "100%" }} />
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
          chartSeries={itemPercentages}
          labels={uniqueItemCategories}
          sx={{ height: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
