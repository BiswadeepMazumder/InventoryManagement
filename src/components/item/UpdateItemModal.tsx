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
import { ITEM_CATEGORY, ITEM_STATUS } from "@/constants/item";

type UpdateItemModalProps = {
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
}: UpdateItemModalProps) {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  useEffect(() => {
    if (open) {
      setValue("itemId", item.itemId);
      setValue("itemName", item.itemName);
      setValue("itemUnitPrice", item.itemUnitPrice);
      setValue("currentStock", item.currentStock);
      setValue("status", item.status);
      setValue("categoryCode", item.categoryCode);
    }
  }, [item, open, setValue]);

  const handleUpdateItem = (values: Values) => {
    console.log("Update item", values);
    onSubmit(values);

    // clear form after submit
    reset();

    // close modal
    onClose();
  };

  const handleClose = (_event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }

    // clear form after close modal
    reset();

    // close modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Update Item</DialogTitle>
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
                    <MenuItem value="AB">{ITEM_CATEGORY["AB"].label}</MenuItem>
                    <MenuItem value="CD">{ITEM_CATEGORY["CD"].label}</MenuItem>
                    <MenuItem value="CF">{ITEM_CATEGORY["CF"].label}</MenuItem>
                    <MenuItem value="CH">{ITEM_CATEGORY["CH"].label}</MenuItem>
                    <MenuItem value="CK">{ITEM_CATEGORY["CK"].label}</MenuItem>
                    <MenuItem value="CO">{ITEM_CATEGORY["CO"].label}</MenuItem>
                    <MenuItem value="FZ">{ITEM_CATEGORY["FZ"].label}</MenuItem>
                    <MenuItem value="PP">{ITEM_CATEGORY["PP"].label}</MenuItem>
                    <MenuItem value="PS">{ITEM_CATEGORY["PS"].label}</MenuItem>
                    <MenuItem value="TO">{ITEM_CATEGORY["TO"].label}</MenuItem>
                    <MenuItem value="SU">{ITEM_CATEGORY["SU"].label}</MenuItem>
                    <MenuItem value="WT">{ITEM_CATEGORY["WT"].label}</MenuItem>
                    <MenuItem value="OD">{ITEM_CATEGORY["OD"].label}</MenuItem>
                    <MenuItem value="US">{ITEM_CATEGORY["US"].label}</MenuItem>
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
          <Button onClick={(event) => handleClose(event, "button")}>
            Close
          </Button>
          <Button type="submit" autoFocus>
            Update Item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
