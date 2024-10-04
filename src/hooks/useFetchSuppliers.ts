"use client";

import { useEffect, useState } from "react";
import { Supplier } from "@/types/supplier";
import { fetchSuppliers } from "@/services/supplier.services";

type UseFetchSuppliers = {
  suppliers: Supplier[];
  loading: boolean;
};

export const useFetchSuppliers = (userId: string): UseFetchSuppliers => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await fetchSuppliers(userId);
        setSuppliers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [userId]);

  return { suppliers, loading };
};

export default useFetchSuppliers;
