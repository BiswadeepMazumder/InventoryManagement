"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { fetchPastOrders } from "@/services/order.services";

type UseFetchPastOrders = {
  orders: Order[];
  loading: boolean;
};

export const useFetchPastOrders = (userId: string): UseFetchPastOrders => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await fetchPastOrders(userId);
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

export default useFetchPastOrders;
