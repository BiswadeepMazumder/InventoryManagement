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
  Select,
  MenuItem,
} from "@mui/material";

import { ORDER_STATUS } from "@/constants/order";
import { Order, OrderItems } from "@/types/order";

import { schema, defaultValues, Values } from "@/components/order/schema";
import OrderItemsTable from "@/components/order/OrderItemsTable";

const applyOrderItemsPagination = (
  rows: OrderItems[],
  page: number,
  rowsPerPage: number,
): OrderItems[] => {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

interface UpdateOrderModalProps {
  order: Order;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
}

export default function UpdateOrderModal({
  order,
  open,
  onClose,
  onSubmit,
}: UpdateOrderModalProps) {
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
    event: React.MouseEvent<HTMLButtonElement> | null,
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

  return (
    <Dialog open={open} onClose={handleClose} scroll="paper" fullWidth>
      <DialogTitle>Update Order</DialogTitle>
      <form onSubmit={handleSubmit(handleUpdateOrder)}>
        <DialogContent>
          <Stack spacing={2}>
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="orderId"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.orderId)}>
                      <InputLabel>Order Id</InputLabel>
                      <OutlinedInput {...field} label="orderId" disabled />
                      {errors.orderId ? (
                        <FormHelperText>
                          {errors.orderId.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />

                <Controller
                  control={control}
                  name="orderAmount"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.orderAmount)}>
                      <InputLabel>Order Amount</InputLabel>
                      <OutlinedInput
                        {...field}
                        label="orderAmount"
                        type="number"
                      />
                      {errors.orderAmount ? (
                        <FormHelperText>
                          {errors.orderAmount.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />
              </Stack>

              <Stack spacing={2} sx={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="orderName"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.orderName)}>
                      <InputLabel>Order Name</InputLabel>
                      <OutlinedInput {...field} label="orderName" />
                      {errors.orderName ? (
                        <FormHelperText>
                          {errors.orderName.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />

                <Controller
                  control={control}
                  name="orderStatus"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.orderStatus)}>
                      <InputLabel>Order Status</InputLabel>
                      <Select {...field} label="orderStatus">
                        <MenuItem value={0}>{ORDER_STATUS[0].label}</MenuItem>
                        <MenuItem value={1}>{ORDER_STATUS[1].label}</MenuItem>
                        <MenuItem value={2}>{ORDER_STATUS[2].label}</MenuItem>
                        <MenuItem value={3}>{ORDER_STATUS[3].label}</MenuItem>
                        <MenuItem value={4}>{ORDER_STATUS[4].label}</MenuItem>
                        <MenuItem value={5}>{ORDER_STATUS[5].label}</MenuItem>
                      </Select>
                      {errors.orderStatus ? (
                        <FormHelperText>
                          {errors.orderStatus.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />
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
          <Button type="submit" autoFocus>
            Update Order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
