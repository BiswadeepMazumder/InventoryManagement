import axios from "axios";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT;

export const fetchSuppliers = async (userId: string): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Supplier/suppliers`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      userId,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const createSupplier = async (
  userId: string,
  supplier: any,
): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Supplier/suppliers`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      userId,
      supplier,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const updateSupplier = async (
  userId: string,
  supplier: any,
): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Supplier/suppliers`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      userId,
      supplier,
    },
  };
  const response = await axios(options);
  return response.data;
};

export const deleteSupplier = async (
  userId: string,
  supplierId: string,
): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/api/Supplier/suppliers`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      userId,
      supplierId,
    },
  };
  const response = await axios(options);
  return response.data;
};
