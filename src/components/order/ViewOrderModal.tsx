import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Stack,
  Typography,
  Chip,
} from "@mui/material";

import { ORDER_STATUS } from "@/constants/order";
import { Order, OrderItems } from "@/types/order";

import { schema, defaultValues, Values } from "@/components/order/schema";
import OrderItemsTable from "@/components/order/OrderItemsTable";
import { formatDate, formatNumberWithCommas } from "@/utils/format";

const applyOrderItemsPagination = (
  rows: OrderItems[],
  page: number,
  rowsPerPage: number,
): OrderItems[] => {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

interface ViewOrderModalProps {
  order: Order;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
}

export default function ViewOrderModal({
  order,
  open,
  onClose,
  onSubmit,
}: ViewOrderModalProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const [orderItemPage, setOrderItemPage] = useState(0);
  const [orderItemRowsPerPage, setOrderItemRowsPerPage] = useState(5);

  const orderItems = watch("orderItems");
  const paginatedOrders = applyOrderItemsPagination(
    orderItems,
    orderItemPage,
    orderItemRowsPerPage,
  );

  useEffect(() => {
    setValue("orderId", order.orderId);
    setValue("orderDate", order.orderDate);
    setValue("orderName", order.orderName);
    setValue("userId", order.userId);
    setValue("orderAmount", order.orderAmount);
    setValue("orderStatus", order.orderStatus);
    setValue("cancelComment", order.cancelComment);
    setValue("orderItems", order.orderItems);
  }, [order, setValue]);

  const handleUpdateOrder = (values: Values) => {
    console.log("Update order", values);
    onSubmit(values);
    onClose();
  };

  const handleClose = (_event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };

  const handleOrderItemPageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setOrderItemPage(newPage);
  };

  const handleOrderItemRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOrderItemRowsPerPage(parseInt(event.target.value, 10));
    setOrderItemPage(0);
  };

  const { label, color } = ORDER_STATUS[
    order.orderStatus as 0 | 1 | 2 | 3 | 4 | 5
  ] ?? {
    label: "Unknown",
    color: "default",
  };

  return (
    <Dialog open={open} onClose={handleClose} scroll="paper" fullWidth>
      <DialogTitle>Order Detail</DialogTitle>
      <form onSubmit={handleSubmit(handleUpdateOrder)}>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Typography variant="body1">
                  <strong>Name:</strong> {order.orderName}
                </Typography>
                <Typography variant="body1">
                  <strong>Date:</strong> {formatDate(order.orderDate)}
                </Typography>
              </Stack>

              <Stack spacing={2} sx={{ flex: 1 }}>
                <Typography variant="body1">
                  <strong>Amount:</strong> $
                  {formatNumberWithCommas(order.orderAmount)}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong>{" "}
                  <Chip color={color} label={label} size="small" />
                </Typography>
              </Stack>
            </Stack>

            <Stack>
              <Controller
                control={control}
                name="cancelComment"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.cancelComment)}>
                    <InputLabel>Cancel Comment</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="cancelComment"
                      type="string"
                      disabled
                    />
                    {errors.cancelComment ? (
                      <FormHelperText>
                        {errors.cancelComment.message}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
            </Stack>

            <Stack spacing={2}>
              <OrderItemsTable
                count={orderItems.length}
                page={orderItemPage}
                rows={paginatedOrders}
                rowsPerPage={orderItemRowsPerPage}
                onPageChange={handleOrderItemPageChange}
                onRowsPerPageChange={handleOrderItemRowsPerPageChange}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          {/*<Button type="submit" autoFocus>*/}
          {/*  Update Order*/}
          {/*</Button>*/}
        </DialogActions>
      </form>
    </Dialog>
  );
}
