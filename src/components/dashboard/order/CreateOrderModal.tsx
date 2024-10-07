import * as React from "react";
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
import {
  schema,
  defaultValues,
  Values,
} from "@/components/dashboard/order/schema";

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
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

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
              name="orderName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.orderName)}>
                  <InputLabel>orderName</InputLabel>
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
                  <InputLabel>orderAmount</InputLabel>
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
                  <InputLabel>orderStatus</InputLabel>
                  <OutlinedInput {...field} label="orderStatus" type="number" />
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
                  <InputLabel>cancelComment</InputLabel>
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
