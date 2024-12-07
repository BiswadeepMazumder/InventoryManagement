import React from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { ORDER_STATUS } from "@/constants/order";
import { Order } from "@/types/order";
import { formatDate, formatNumberWithCommas } from "@/utils/format";

import { fetchOrderById, fetchOrders } from "@/services/order.services";

interface PageProps {
  params: { id: string };
}

export default async function Page({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const id = params.id;
  let order: Order | null = null;

  try {
    order = await fetchOrderById("user-id", id);
  } catch (error) {
    console.error("Error fetching order", error);
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const { label, color } = ORDER_STATUS[
    order.orderStatus as 0 | 1 | 2 | 3 | 4 | 5
  ] ?? {
    label: "Unknown",
    color: "default",
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Order</Typography>
        </Stack>
      </Stack>

      <Card sx={{ p: 2, display: "flex", gap: 2 }}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h6">Name: {order.orderName}</Typography>
          <Typography variant="body1">
            Date: {formatDate(order.orderDate)}
          </Typography>
          <Typography variant="body1">
            Amount: $
            {formatNumberWithCommas(parseFloat(order.orderAmount.toFixed(2)))}
          </Typography>
          <Typography variant="body1">
            Status: <Chip color={color} label={label} size="small" />
          </Typography>
          <Typography variant="body1">
            Cancel Comment: {order.cancelComment}
          </Typography>
          {/*<Typography variant="body1">User Id: {order.userId}</Typography>*/}
        </Stack>
      </Card>
    </Stack>
  );
}

export async function generateStaticParams() {
  const orders = await fetchOrders("user-id");

  return orders.map((order: Order) => ({
    id: order.orderId,
  }));
}
