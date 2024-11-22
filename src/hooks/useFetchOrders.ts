"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchOrders } from "@/services/order.services";
import { Order } from "@/types/order";

type UseFetchOrders = {
  orders: Order[];
  loading: boolean;
  refresh: () => void;
};

export const useFetchOrders = (userId: string): UseFetchOrders => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchOrders(userId);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const refresh = useCallback(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { orders, loading, refresh };
};

export default useFetchOrders;
