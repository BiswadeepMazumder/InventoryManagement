"use client";

import React, { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Upload as UploadIcon } from "@phosphor-icons/react/dist/ssr/Upload";

import { ItemsFilters } from "@/components/dashboard/item/ItemsFilters";
import { ItemsTable } from "@/components/dashboard/item/ItemsTable";

import { Item } from "@/types/item";
import useFetchItems from "@/hooks/useFetchItems";
import CreateItemModal from "@/components/dashboard/item/CreateItemModal";
import { createItem } from "@/services/item.services";

export default function Page(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { items, loading } = useFetchItems("user-id");

  const paginatedItems = applyPagination(items, page, rowsPerPage);

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

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleSubmitCreateItem = async (values: Item) => {
    console.log("Create item", values);
    try {
      const response = await createItem("user-id", values);
      console.log("Item created", response);
      toast(response.toString());
    } catch (error) {
      console.error("Error creating item", error);
      if (error) toast(error.toString());
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Items</Typography>
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
            onClick={handleOpenCreateModal}
          >
            Add
          </Button>
        </div>
      </Stack>
      <ItemsFilters />
      <ItemsTable
        count={items.length}
        page={page}
        rows={paginatedItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <CreateItemModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleSubmitCreateItem}
      />
      <ToastContainer />
    </Stack>
  );
}

function applyPagination(
  rows: Item[],
  page: number,
  rowsPerPage: number,
): Item[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
