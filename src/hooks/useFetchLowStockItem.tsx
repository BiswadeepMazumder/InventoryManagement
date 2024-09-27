// create fetchLowStockItem hook

import { useEffect, useState } from "react";
import { fetchLowStockItem } from "@/services/item.services";

export type Item = {
  itemId: string;
  itemName: string;
  itemUnitPrice: number;
  currentStock: number;
  status: number;
  categoryCode: string;
};

type UseFetchLowStockItem = {
  items: Item[];
  loading: boolean;
};

export const useFetchLowStockItem = (userId: string): UseFetchLowStockItem => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchLowStockItem(userId);
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

export default useFetchLowStockItem;
