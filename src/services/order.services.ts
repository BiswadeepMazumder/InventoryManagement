import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

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

export const updateOrder = async (userId: string, order: any): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Order`,
    method: "PUT",
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
