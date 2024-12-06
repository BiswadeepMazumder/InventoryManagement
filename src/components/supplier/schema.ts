import { z as zod } from "zod";
import { nanoid } from "nanoid";

export const schema = zod.object({
  supplierId: zod.string().min(1, { message: "supplierId is required" }),
  supplierName: zod.string().min(1, { message: "supplierName is required" }),
  supplierAddress: zod
    .string()
    .min(1, { message: "supplierAddress is required" }),
  supplierCity: zod.string().min(1, { message: "supplierCity is required" }),
  supplierZipCode: zod.coerce
    .number()
    .min(1, { message: "supplierZipCode is required" }),
  supplierPhoneNumber: zod.coerce
    .number()
    .min(1, { message: "supplierPhoneNumber is required" }),
});

export type Values = zod.infer<typeof schema>;

export const defaultValues = {
  supplierId: "",
  supplierName: "",
  supplierAddress: "",
  supplierCity: "",
  supplierZipCode: 0,
  supplierPhoneNumber: 0,
} satisfies Values;
