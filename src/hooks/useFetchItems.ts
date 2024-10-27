"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchItems } from "@/services/item.services";
import { Item } from "@/types/item";

type UseFetchItems = {
  items: Item[];
  loading: boolean;
  refresh: () => void;
};

export const useFetchItems = (userId: string): UseFetchItems => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchItems(userId);
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { items, loading, refresh: fetch };
};

export default useFetchItems;
