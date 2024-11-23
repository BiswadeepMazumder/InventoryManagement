import axios from "axios";
import { Order } from "@/types/order";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const fetchUpcomingOrders = async (userId: string): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/UpcomingOrders`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      userId,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const fetchPastOrders = async (userId: string): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/PastOrders`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      userId,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const fetchOrders = async (userId: string): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Order`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      userId,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const fetchOrderById = async (
  userId: string,
  orderId: string,
): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/ViewOrderDetail${orderId}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      userId,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const createOrder = async (userId: string, order: any): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Order`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      userId,
      order,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const updateOrder = async (
  userId: string,
  order: Order,
): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/ModifyOrder${order.orderId}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      id: order.orderId,
      orderId: order.orderId,
      orderDate: order.orderDate,
      orderName: order.orderName,
      userId: order.userId,
      orderAmount: order.orderAmount,
      orderStatus: order.orderStatus,
      cancelComment: order.cancelComment,
      orderItems: order.orderItems,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const deleteOrder = async (
  userId: string,
  orders: any,
): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Order`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      userId,
      orders,
    },
  };
  const response = await axios(options);
  return response.data;
};
