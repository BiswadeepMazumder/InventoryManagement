import { z as zod } from "zod";
import { nanoid } from "nanoid";

export const schema = zod.object({
  itemId: zod.string(),
  itemName: zod.string().min(1, { message: "itemName is required" }),
  itemUnitPrice: zod.coerce
    .number()
    .min(1, { message: "itemUnitPrice is required" }),
  currentStock: zod.coerce
    .number()
    .min(1, { message: "currentStock is required" }),
  status: zod.coerce.number().min(0, { message: "status is required" }),
  categoryCode: zod.string().min(1, { message: "categoryCode is required" }),
});

export type Values = zod.infer<typeof schema>;

export const defaultValues = {
  itemId: "",
  itemName: "",
  itemUnitPrice: 0,
  currentStock: 0,
  status: 1,
  categoryCode: "",
} satisfies Values;
