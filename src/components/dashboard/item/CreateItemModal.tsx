import * as React from "react";
import { nanoid } from "nanoid";
import { z as zod } from "zod";
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

const schema = zod.object({
  itemId: zod.string(),
  itemName: zod.string().min(1, { message: "itemName is required" }),
  itemUnitPrice: zod.coerce
    .number()
    .min(1, { message: "itemUnitPrice is required" }),
  currentStock: zod.coerce
    .number()
    .min(1, { message: "currentStock is required" }),
  status: zod.coerce.number().min(1, { message: "status is required" }),
  categoryCode: zod.string().min(1, { message: "categoryCode is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  itemId: nanoid(),
  itemName: "",
  itemUnitPrice: 0,
  currentStock: 0,
  status: 0,
  categoryCode: "",
} satisfies Values;

type CreateItemModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
};

export default function CreateItemModal({
  open,
  onClose,
  onSubmit,
}: CreateItemModalProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const handleCreateItem = (values: Values) => {
    console.log("Create item", values);
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
      <DialogTitle>Create a new item</DialogTitle>
      <form onSubmit={handleSubmit(handleCreateItem)}>
        <DialogContent>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.itemName)}>
                  <InputLabel>itemName</InputLabel>
                  <OutlinedInput {...field} label="itemName" />
                  {errors.itemName ? (
                    <FormHelperText>{errors.itemName.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="itemUnitPrice"
              render={({ field }) => (
                <FormControl error={Boolean(errors.itemUnitPrice)}>
                  <InputLabel>itemUnitPrice</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="itemUnitPrice"
                    type="number"
                  />
                  {errors.itemUnitPrice ? (
                    <FormHelperText>
                      {errors.itemUnitPrice.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="currentStock"
              render={({ field }) => (
                <FormControl error={Boolean(errors.currentStock)}>
                  <InputLabel>currentStock</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="currentStock"
                    type="number"
                  />
                  {errors.currentStock ? (
                    <FormHelperText>
                      {errors.currentStock.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <FormControl error={Boolean(errors.status)}>
                  <InputLabel>status</InputLabel>
                  <OutlinedInput {...field} label="status" type="number" />
                  {errors.status ? (
                    <FormHelperText>{errors.status.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="categoryCode"
              render={({ field }) => (
                <FormControl error={Boolean(errors.categoryCode)}>
                  <InputLabel>categoryCode</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="categoryCode"
                    type="string"
                  />
                  {errors.categoryCode ? (
                    <FormHelperText>
                      {errors.categoryCode.message}
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
            Create item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
