import * as React from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import type { SxProps } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const statusMap = {
  0: { label: "Order Canceled", color: "error" },
  1: { label: "Order Placed", color: "info" },
  2: { label: "Order Accepted by Supplier", color: "primary" },
  3: { label: "Order Ready", color: "success" },
  4: { label: "Order in Transit", color: "warning" },
  5: { label: "Order Delivered", color: "success" },
} as const;
//   pending: { label: "Pending", color: "warning" },
//   completed: { label: "Completed", color: "success" },
//   refunded: { label: "Refunded", color: "error" },

export interface Order {
  id: string;
  createdAt: Date;
  amount: number;
  orderName: string;
  status: number; // "pending" | "completed" | "refunded"
}

export interface RecentOrdersProps {
  orders?: Order[];
  sx?: SxProps;
}

export function RecentOrders({
  orders = [],
  sx,
}: RecentOrdersProps): React.JSX.Element {
  const router = useRouter();

  const handleViewAll = () => {
    router.push("dashboard/orders");
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Recent Orders" />
      <Divider />
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Order Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const { label, color } = statusMap[
                order.status as 0 | 1 | 2 | 3 | 4 | 5
              ] ?? {
                label: "Unknown",
                color: "default",
              };

              return (
                <TableRow hover key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {dayjs(order.createdAt).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.orderName}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
          onClick={handleViewAll}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
