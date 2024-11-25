import { z as zod } from "zod";
import { nanoid } from "nanoid";

export const schema = zod.object({
  orderId: zod.string(),
  orderDate: zod.string().min(1, { message: "Order Date is required" }),
  orderName: zod.string().min(1, { message: "Order Name is required" }),
  userId: zod.string().min(1, { message: "User Id is required" }),
  orderAmount: zod.coerce
    .number()
    .min(1, { message: "Order Amount is required" }),
  orderStatus: zod.coerce
    .number()
    .min(0, { message: "Order Status is required" }),
  cancelComment: zod.string().nullable().optional(),
  orderItems: zod.array(
    zod.object({
      orderId: zod.string().min(1, { message: "Order Id is required" }),
      itemId: zod.string().min(1, { message: "Item Id is required" }),
      orderDate: zod.string().min(1, { message: "Order Date is required" }),
      itemCount: zod.coerce
        .number()
        .min(1, { message: "Item Count is required" }),
      itemName: zod.string().min(1, { message: "Item Name is required" }),
      totalPrice: zod.coerce
        .number()
        .min(1, { message: "Total Price is required" }),
      orderStatus: zod.coerce
        .number()
        .min(0, { message: "Order Status is required" }),
    }),
  ),
});

export type Values = zod.infer<typeof schema>;

export const defaultValues = {
  orderId: nanoid().toString().slice(0, 7), // Generate random id with 7 characters
  orderDate: new Date().toISOString(),
  orderName: nanoid().toString().slice(0, 6),
  userId: "",
  orderAmount: 0,
  orderStatus: 1,
  cancelComment: "",
  orderItems: [],
} satisfies Values;
