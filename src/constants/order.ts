export const ORDER_STATUS = {
  0: { label: "Order Canceled", color: "error" },
  1: { label: "Order Placed", color: "info" },
  2: { label: "Order Accepted by Supplier", color: "primary" },
  3: { label: "Order Ready", color: "success" },
  4: { label: "Order in Transit", color: "warning" },
  5: { label: "Order Delivered", color: "success" },
} as const;
