import { z as zod } from "zod";
import { nanoid } from "nanoid";

export const schema = zod.object({
  orderId: zod.string(),
  orderDate: zod.string().min(1, { message: "orderDate is required" }),
  orderName: zod.string().min(1, { message: "orderName is required" }),
  userId: zod.string().min(1, { message: "userId is required" }),
  orderAmount: zod.coerce
    .number()
    .min(1, { message: "orderAmount is required" }),
  orderStatus: zod.coerce
    .number()
    .min(0, { message: "orderStatus is required" }),
  cancelComment: zod.string().nullable().optional(),
  orderItems: zod.array(
    zod.object({
      orderId: zod.string().min(1, { message: "orderId is required" }),
      itemId: zod.string().min(1, { message: "itemId is required" }),
      orderDate: zod.string().min(1, { message: "orderDate is required" }),
      itemCount: zod.coerce
        .number()
        .min(1, { message: "itemCount is required" }),
      itemName: zod.string().min(1, { message: "itemName is required" }),
      totalPrice: zod.coerce
        .number()
        .min(1, { message: "totalPrice is required" }),
      orderStatus: zod.coerce
        .number()
        .min(0, { message: "orderStatus is required" }),
    }),
  ),
});

export type Values = zod.infer<typeof schema>;

export const defaultValues = {
  orderId: nanoid().toString().slice(0, 7), // Generate random id with 7 characters
  orderDate: new Date().toISOString(),
  orderName: "",
  userId: "",
  orderAmount: 0,
  orderStatus: 0,
  cancelComment: "",
  orderItems: [],
} satisfies Values;
