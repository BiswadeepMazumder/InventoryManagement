import axios from "axios";
import { Item } from "@/types/item";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT;

export const fetchItems = async (userId: string): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Item`,
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

export const fetchLowStockItem = async (userId: string): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Item/lowstock`,
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

export const fetchItemById = async (
  userId: string,
  itemId: string,
): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Item/${itemId}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const response = await axios(options);
  return response.data;
};

export const createItem = async (userId: string, item: Item): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Item`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      itemId: item.itemId,
      itemName: item.itemName,
      itemUnitPrice: item.itemUnitPrice,
      currentStock: item.currentStock,
      status: item.status,
      categoryCode: item.categoryCode,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const updateItemById = async (
  userId: string,
  item: Item,
): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Item/${item.itemId}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      itemId: item.itemId,
      itemName: item.itemName,
      itemUnitPrice: item.itemUnitPrice,
      currentStock: item.currentStock,
      status: item.status,
      categoryCode: item.categoryCode,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const deleteItemById = async (
  userId: string,
  itemId: string,
): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Item/${itemId}`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const response = await axios(options);
  return response.data;
};
