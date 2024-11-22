export const ORDER_STATUS = {
  0: { label: "Order Canceled", value: 0, color: "error" },
  1: { label: "Order Placed", value: 1, color: "info" },
  2: {
    label: "Order Accepted by Supplier",
    value: 2,
    color: "primary",
  },
  3: { label: "Order Ready", value: 3, color: "success" },
  4: { label: "Order in Transit", value: 4, color: "warning" },
  5: { label: "Order Delivered", value: 5, color: "success" },
} as const;
