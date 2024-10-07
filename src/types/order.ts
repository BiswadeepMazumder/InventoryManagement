export interface Order {
  orderId: string;
  orderDate: string;
  orderName: string;
  userId: string;
  orderAmount: number;
  orderStatus: number;
  cancelComment: string;
  orderItems: OrderItems[];
}

export interface OrderItems {
  orderId: string;
  itemId: string;
  orderDate: string;
  itemCount: number;
  itemName: string;
  totalPrice: number;
  orderStatus: number;
}
