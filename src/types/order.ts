export interface Order {
  orderId: string;
  orderDate: string;
  orderName: string;
  userId: string;
  orderAmount: number;
  orderStatus: 0 | 1 | 2 | 3 | 4 | 5 | number;
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
