"use client";

import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import { OrdersTable } from "@/components/dashboard/order/OrdersTable";

import { Order } from "@/types/order";
import useFetchOrders from "@/hooks/useFetchOrders";
import { usePopover } from "@/hooks/usePopover";
import { toast, ToastContainer } from "react-toastify";
import ExportSheet from "@/utils/export-sheet";
import ExportPopover from "@/components/table/ExportPopover";
import CreateOrderModal from "@/components/dashboard/order/CreateOrderModal";
import {
  createOrder,
  deleteOrder,
  updateOrder,
} from "@/services/order.services";
import TableFilters from "@/components/table/TableFilters";
import UpdateOrderModal from "@/components/dashboard/order/UpdateOrderModal";
import DeleteOrderModal from "@/components/dashboard/order/DeleteOrderModal";

const applyPagination = (
  rows: Order[],
  page: number,
  rowsPerPage: number,
): Order[] => {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

export default function Page(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searched, setSearched] = useState<string>("");

  const [selectedUpdateOrder, setSelectedUpdateOrder] = useState<Order>();
  const [selectedDeleteOrders, setSelectedDeleteOrders] = useState<Order[]>([]);
  const [searchOrders, setSearchOrders] = useState<Order[]>([]);

  const exportPopover = usePopover<HTMLDivElement>();
  const { orders, loading } = useFetchOrders("user-id");

  const ordersToDisplay = searched ? searchOrders : orders;
  const paginatedOrders = applyPagination(ordersToDisplay, page, rowsPerPage);

  useEffect(() => {
    const filteredRows = orders.filter((row) => {
      return row.orderName.toLowerCase().includes(searched.toLowerCase());
    });

    setSearchOrders(filteredRows);
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

  const handleCreateOrder = async (order: Order) => {
    console.log("Creating order", order);
    try {
      const response = await createOrder("user-id", order);
      console.log("Order created", response);
      toast(response.toString());
    } catch (error) {
      console.error("Error creating order", error);
      if (error) toast(error.toString());
    }
  };

  const handleOpenUpdateModal = (order: Order) => {
    setSelectedUpdateOrder(order);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateOrder = async (order: Order) => {
    console.log("Updating order", order);
    try {
      const response = await updateOrder("user-id", order);
      console.log("Order updated", response);
      toast(response.toString());
    } catch (error) {
      console.error("Error updating order", error);
      if (error) toast(error.toString());
    }
  };

  const handleOpenDeleteModal = (orders: Order[]) => {
    setSelectedDeleteOrders(orders);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteOrder = async () => {
    console.log("Deleting order", selectedDeleteOrders);
    for (const order of selectedDeleteOrders) {
      try {
        const response = await deleteOrder("user-id", order.orderId);
        console.log("Order deleted", response);
        toast(response.toString());
      } catch (error) {
        console.error("Error deleting order", error);
        if (error) toast(error.toString());
      }
    }

    handleCloseDeleteModal();
  };

  const handleExport = (type: string) => {
    console.log("Exporting orders", type);
    if (type) {
      ExportSheet({ data: orders, fileType: type as "csv" | "xlsx" });
    }
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
        placeholder="Search orders"
        value={searched}
        onChange={(searchVal) => setSearched(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />

      <OrdersTable
        count={paginatedOrders.length}
        page={page}
        rows={paginatedOrders}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onUpdateOrder={handleOpenUpdateModal}
        onDeleteOrder={handleOpenDeleteModal}
      />

      <CreateOrderModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateOrder}
      />

      {selectedUpdateOrder && (
        <UpdateOrderModal
          open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          order={selectedUpdateOrder}
          onSubmit={handleUpdateOrder}
        />
      )}

      <DeleteOrderModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onSubmit={handleDeleteOrder}
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
