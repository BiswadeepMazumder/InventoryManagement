"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { fetchUpcomingOrders } from "@/services/order.services";

type UseFetchUpcomingOrders = {
  orders: Order[];
  loading: boolean;
};

export const useFetchUpcomingOrders = (
  userId: string,
): UseFetchUpcomingOrders => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await fetchUpcomingOrders(userId);
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

export default useFetchUpcomingOrders;
