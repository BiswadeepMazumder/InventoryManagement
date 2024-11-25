import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { schema, defaultValues, Values } from "@/components/order/schema";
import { ORDER_STATUS } from "@/constants/order";
import { useUser } from "@/hooks/useUser";

type CreateOrderModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
};

export default function CreateOrderModal({
  open,
  onClose,
  onSubmit,
}: CreateOrderModalProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const { user } = useUser();

  useEffect(() => {
    // Set the userId to order form
    if (user && user.uid) {
      setValue("userId", user.uid.toString());
    }
  }, [user, setValue]);

  const handleCreateOrder = (values: Values) => {
    console.log("Create order", values);
    onSubmit(values);
    onClose();
  };

  const handleClose = (_event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create a new order</DialogTitle>
      <form onSubmit={handleSubmit(handleCreateOrder)}>
        <DialogContent>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="orderId"
              render={({ field }) => (
                <FormControl error={Boolean(errors.orderId)}>
                  <InputLabel>Order Id</InputLabel>
                  <OutlinedInput {...field} label="orderId" disabled />
                  {errors.orderId ? (
                    <FormHelperText>{errors.orderId.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="orderName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.orderName)}>
                  <InputLabel>Order Name</InputLabel>
                  <OutlinedInput {...field} label="orderName" />
                  {errors.orderName ? (
                    <FormHelperText>{errors.orderName.message}</FormHelperText>
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
                  <OutlinedInput {...field} label="orderAmount" type="number" />
                  {errors.orderAmount ? (
                    <FormHelperText>
                      {errors.orderAmount.message}
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
                      {errors.cancelComment.message?.toString()}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button type="submit" autoFocus>
            Create order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
