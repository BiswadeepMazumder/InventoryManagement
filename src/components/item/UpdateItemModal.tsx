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

import { Item } from "@/types/item";
import { schema, defaultValues, Values } from "@/components/item/schema";
import { ITEM_STATUS } from "@/constants/item";

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
    setValue("itemId", item.itemId);
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
              name="itemId"
              render={({ field }) => (
                <FormControl error={Boolean(errors.itemId)}>
                  <InputLabel>Item Id</InputLabel>
                  <OutlinedInput {...field} label="itemId" disabled />
                  {errors.itemId ? (
                    <FormHelperText>{errors.itemId.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.itemName)}>
                  <InputLabel>Item Name</InputLabel>
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
                  <InputLabel>Unit Price</InputLabel>
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
                  <InputLabel>Current Stock</InputLabel>
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
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="status">
                    <MenuItem value={0}>{ITEM_STATUS[0].label}</MenuItem>
                    <MenuItem value={1}>{ITEM_STATUS[1].label}</MenuItem>
                  </Select>
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
                  <InputLabel>Category Code</InputLabel>
                  <Select {...field} label="categoryCode">
                    <MenuItem value="AB">AB</MenuItem>
                    <MenuItem value="CD">CD</MenuItem>
                    <MenuItem value="CF">CF</MenuItem>
                    <MenuItem value="PP">PP</MenuItem>
                    <MenuItem value="PS">PS</MenuItem>
                    <MenuItem value="TO">TO</MenuItem>
                    <MenuItem value="WT">WT</MenuItem>
                  </Select>
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
            Update Item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
