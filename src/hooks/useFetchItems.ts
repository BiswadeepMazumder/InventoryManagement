"use client";

import { useEffect, useState } from "react";
import { fetchItems } from "@/services/item.services";
import { Item } from "@/types/item";

type UseFetchItems = {
  items: Item[];
  loading: boolean;
};

export const useFetchItems = (userId: string): UseFetchItems => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
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
