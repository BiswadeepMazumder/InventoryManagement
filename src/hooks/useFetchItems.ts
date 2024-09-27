"use client";

import { useEffect, useState } from "react";
import { fetchItems } from "@/services/item.services";

export type Item = {
  itemId: string;
  itemName: string;
  itemUnitPrice: number;
  currentStock: number;
  status: number;
  categoryCode: string;
};

type UseFetchItems = {
  items: Item[];
  loading: boolean;
};

export const useFetchItems = (userId: string): UseFetchItems => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchItems(userId);
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [userId]);

  return { items, loading };
};

export default useFetchItems;
