"use client";

import React, { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Upload as UploadIcon } from "@phosphor-icons/react/dist/ssr/Upload";

import { OrdersFilters } from "@/components/dashboard/order/OrdersFilters";
import { OrdersTable } from "@/components/dashboard/order/OrdersTable";

import { Order } from "@/types/order";
import useFetchOrders from "@/hooks/useFetchOrders";

export default function Page(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { orders, loading } = useFetchOrders("user-id");

  const paginatedOrders = applyPagination(orders, page, rowsPerPage);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Orders</Typography>
        </Stack>
        <div>
          <Button
            color="inherit"
            startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}
          >
            Import
          </Button>
          <Button
            color="inherit"
            startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
          >
            Export
          </Button>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Stack>
      <OrdersFilters />
      <OrdersTable
        count={paginatedOrders.length}
        page={page}
        rows={paginatedOrders}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Stack>
  );
}

function applyPagination(
  rows: Order[],
  page: number,
  rowsPerPage: number,
): Order[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
