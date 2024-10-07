import { useEffect } from "react";
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

import { Item } from "@/types/item";
import {
  schema,
  defaultValues,
  Values,
} from "@/components/dashboard/item/schema";

type CreateItemModalProps = {
  item: Item;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
};

export default function UpdateItemModal({
  item,
  open,
  onClose,
  onSubmit,
}: CreateItemModalProps) {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  useEffect(() => {
    setValue("itemName", item.itemName);
    setValue("itemUnitPrice", item.itemUnitPrice);
    setValue("currentStock", item.currentStock);
    setValue("status", item.status);
    setValue("categoryCode", item.categoryCode);
  }, [item]);

  const handleUpdateItem = (values: Values) => {
    console.log("Update item", values);
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
      <DialogTitle>Update item</DialogTitle>
      <form onSubmit={handleSubmit(handleUpdateItem)}>
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
            Update item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
