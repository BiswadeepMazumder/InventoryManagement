"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import ItemsTable from "@/components/dashboard/item/ItemsTable";
import TableFilters from "@/components/table/TableFilters";
import CreateItemModal from "@/components/dashboard/item/CreateItemModal";
import UpdateItemModal from "@/components/dashboard/item/UpdateItemModal";
import DeleteItemModal from "@/components/dashboard/item/DeleteItemModal";
import ExportPopover from "@/components/table/ExportPopover";

import { Item } from "@/types/item";

import useFetchItems from "@/hooks/useFetchItems";
import usePopover from "@/hooks/usePopover";

import ExportSheet from "@/utils/export-sheet";

import {
  createItem,
  deleteItemById,
  updateItemById,
} from "@/services/item.services";

const applyPagination = (
  rows: Item[],
  page: number,
  rowsPerPage: number,
): Item[] => {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

export default function Page(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searched, setSearched] = useState<string>("");

  const [selectedUpdateItem, setSelectedUpdateItem] = useState<Item>();
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<Item[]>([]);
  const [searchItems, setSearchItems] = useState<Item[]>([]);

  const exportPopover = usePopover<HTMLDivElement>();
  const { items, loading, refresh } = useFetchItems("user-id");

  const itemsToDisplay = searched ? searchItems : items;
  const paginatedItems = applyPagination(itemsToDisplay, page, rowsPerPage);

  useEffect(() => {
    const filteredRows = items.filter((row) => {
      return row.itemName.toLowerCase().includes(searched.toLowerCase());
    });

    setSearchItems(filteredRows);
  }, [searched]);

  const cancelSearch = () => {
    setSearched("");
  };

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

  const handleCreateItem = async (item: Item) => {
    console.log("Create item", item);
    try {
      const response = await createItem("user-id", item);
      console.log("Item created", response);
      toast("Item created");
      refresh();
    } catch (error) {
      console.error("Error creating item", error);
      if (error) toast(error.toString());
    }
  };

  const handleOpenUpdateModal = (values: Item) => {
    setOpenUpdateModal(true);
    setSelectedUpdateItem(values);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateItem = async (item: Item) => {
    console.log("Update item", item);
    try {
      const response = await updateItemById("user-id", item);
      console.log("Item Updated", response);
      toast("Item updated");
      refresh();
    } catch (error) {
      console.error("Error updating item", error);
      if (error) toast(error.toString());
    }
  };

  const handleOpenDeleteModal = (items: Item[]) => {
    setOpenDeleteModal(true);
    setSelectedDeleteItem(items);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteItem = async () => {
    console.log("Delete item", selectedDeleteItem);

    // loop through the items and delete them one by one
    for (const item of selectedDeleteItem) {
      try {
        const response = await deleteItemById("user-id", item.itemId);
        console.log("Item Deleted", response);
        toast("Item deleted");
        refresh();
      } catch (error) {
        console.error("Error deleting item", error);
        if (error) toast(error.toString());
      }
    }

    // close the modal
    handleCloseDeleteModal();
  };

  const handleExport = (type: string) => {
    try {
      if (type) {
        ExportSheet({ data: items, fileType: type as "csv" | "xlsx" });
        toast("Items exported");
      }
    } catch (error) {
      console.error("Error exporting items", error);
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
            startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
            onClick={exportPopover.handleOpen}
            ref={exportPopover.anchorRef}
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

      <TableFilters
        placeholder="Search items"
        value={searched}
        onChange={(searchVal: string) => setSearched(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />

      <ItemsTable
        count={itemsToDisplay.length}
        page={page}
        rows={paginatedItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onUpdate={handleOpenUpdateModal}
        onDelete={handleOpenDeleteModal}
      />

      <CreateItemModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateItem}
      />

      {selectedUpdateItem && (
        <UpdateItemModal
          item={selectedUpdateItem}
          open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateItem}
        />
      )}

      <DeleteItemModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onSubmit={handleDeleteItem}
      />

      <ExportPopover
        anchorEl={exportPopover.anchorRef.current}
        onClose={exportPopover.handleClose}
        open={exportPopover.open}
        onClick={handleExport}
      />

      <ToastContainer />
    </Stack>
  );
}
