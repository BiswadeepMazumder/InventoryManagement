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
import { Supplier } from "@/types/supplier";
import { schema, defaultValues, Values } from "@/components/supplier/schema";

type CreateSupplierModalProps = {
  supplier: Supplier;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
};

export default function UpdateSupplierModal({
  supplier,
  open,
  onClose,
  onSubmit,
}: CreateSupplierModalProps) {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  useEffect(() => {
    setValue("supplierName", supplier.supplierName);
    setValue("supplierAddress", supplier.supplierAddress);
    setValue("supplierCity", supplier.supplierCity);
    setValue("supplierZipCode", supplier.supplierZipCode);
    setValue("supplierPhoneNumber", supplier.supplierPhoneNumber);
  }, [supplier, setValue]);

  const handleUpdateSupplier = (values: Values) => {
    console.log("Update supplier", values);
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
      <DialogTitle>Update supplier</DialogTitle>
      <form onSubmit={handleSubmit(handleUpdateSupplier)}>
        <DialogContent>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="supplierName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.supplierName)}>
                  <InputLabel>supplierName</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="supplierName"
                    type="string"
                  />
                  {errors.supplierName ? (
                    <FormHelperText>
                      {errors.supplierName.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="supplierAddress"
              render={({ field }) => (
                <FormControl error={Boolean(errors.supplierAddress)}>
                  <InputLabel>supplierAddress</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="supplierAmount"
                    type="string"
                  />
                  {errors.supplierAddress ? (
                    <FormHelperText>
                      {errors.supplierAddress.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="supplierCity"
              render={({ field }) => (
                <FormControl error={Boolean(errors.supplierCity)}>
                  <InputLabel>supplierCity</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="supplierCity"
                    type="string"
                  />
                  {errors.supplierCity ? (
                    <FormHelperText>
                      {errors.supplierCity.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="supplierZipCode"
              render={({ field }) => (
                <FormControl error={Boolean(errors.supplierZipCode)}>
                  <InputLabel>supplierZipCode</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="supplierZipCode"
                    type="number"
                  />
                  {errors.supplierZipCode ? (
                    <FormHelperText>
                      {errors.supplierZipCode.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="supplierPhoneNumber"
              render={({ field }) => (
                <FormControl error={Boolean(errors.supplierPhoneNumber)}>
                  <InputLabel>supplierPhoneNumber</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="supplierPhoneNumber"
                    type="number"
                  />
                  {errors.supplierPhoneNumber ? (
                    <FormHelperText>
                      {errors.supplierPhoneNumber.message}
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
            Update supplier
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
