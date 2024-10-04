"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { fetchOrders } from "@/services/order.services";

type UseFetchOrders = {
  orders: Order[];
  loading: boolean;
};

export const useFetchOrders = (userId: string): UseFetchOrders => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders(userId);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [userId]);

  return { orders, loading };
};

export default useFetchOrders;
