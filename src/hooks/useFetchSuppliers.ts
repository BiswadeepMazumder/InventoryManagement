"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchSuppliers } from "@/services/supplier.services";
import { Supplier } from "@/types/supplier";

type UseFetchSuppliers = {
  suppliers: Supplier[];
  loading: boolean;
  refresh: () => void;
};

export const useFetchSuppliers = (userId: string): UseFetchSuppliers => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchSuppliers(userId);
      setSuppliers(data);
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

  return { suppliers, loading, refresh };
};

export default useFetchSuppliers;
