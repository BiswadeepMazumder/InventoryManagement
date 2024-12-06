"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Card, Stack, Typography } from "@mui/material";
import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import { Order } from "@/types/order";
import ExportSheet from "@/utils/export-sheet";

import useFetchOrders from "@/hooks/useFetchOrders";
import usePopover from "@/hooks/usePopover";

import OrdersTable from "@/components/order/OrdersTable";
import TableFilters from "@/components/table/TableFilters";
import PlaceOrderModal from "@/components/order/PlaceOrderModal";
import ViewOrderModal from "@/components/order/ViewOrderModal";
import DeleteOrderModal from "@/components/order/DeleteOrderModal";
import ExportPopover from "@/components/table/ExportPopover";

import {
  cancelOrder,
  createOrder,
  deleteOrder,
  fetchOrderInvoiceById,
} from "@/services/order.services";
import StatusFilters, {
  FilterType as StatusFilterType,
} from "@/components/table/OrderStatusFilters";

const applyPagination = (
  rows: Order[],
  page: number,
  rowsPerPage: number,
): Order[] => {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

export default function Page(): React.JSX.Element {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openPlaceModal, setOpenPlaceModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedViewOrder, setSelectedViewOrder] = useState<Order>();
  const [selectedDeleteOrders, setSelectedDeleteOrders] = useState<Order[]>([]);

  const [filterOrders, setFilterOrders] = useState<Order[]>([]);

  const [searched, setSearched] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState(StatusFilterType.None);

  const exportPopover = usePopover<HTMLDivElement>();
  const { orders, loading, refresh } = useFetchOrders("user-id");

  const isParams = searchParams.has("filter");
  const isEmpty = orders.length === 0;
  const isSearch = searched.length > 0;
  const isFilteredStatus = filterStatus !== StatusFilterType.None;

  const ordersToDisplay =
    isParams || isSearch || isFilteredStatus ? filterOrders : orders;
  const paginatedOrders = applyPagination(ordersToDisplay, page, rowsPerPage);

  // Filter orders based on params in URL (filter=current|past|upcoming)
  useEffect(() => {
    if (!isParams) return;

    const params = searchParams.get("filter");

    const filteredRows = orders.filter((row) => {
      const results = [];

      if (params === "current") {
        const _row =
          row.orderStatus === StatusFilterType.OrderPlaced ||
          row.orderStatus === StatusFilterType.OrderAccepted ||
          row.orderStatus === StatusFilterType.OrderReady;
        results.push(_row);
      } else if (params === "past") {
        const _row = row.orderStatus === StatusFilterType.OrderDelivered;
        results.push(_row);
      } else if (params === "upcoming") {
        const _row = row.orderStatus === StatusFilterType.OrderInTransit;
        results.push(_row);
      }

      return results.every((result) => result);
    });

    setFilterOrders(filteredRows);
    setPage(0);
  }, [orders, searchParams, isParams]);

  // Filter orders based on search text or status or category code
  useEffect(() => {
    if (!searched && filterStatus === StatusFilterType.None) return;

    const filteredRows = orders.filter((row) => {
      const results = [];

      // search text
      if (searched) {
        const searchValue = searched.toLowerCase();
        const _row = row.orderName.toLowerCase().includes(searchValue);
        results.push(_row);
      }

      // status filter
      if (filterStatus !== StatusFilterType.None) {
        const _row = row.orderStatus === filterStatus;
        results.push(_row);
      }

      return results.every((result) => result);
    });

    setFilterOrders(filteredRows);
    setPage(0);
  }, [orders, searched, filterStatus]);

  const cancelSearch = () => {
    setSearched("");
  };

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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

  const handleOpenViewModal = (order: Order) => {
    setSelectedViewOrder(order);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handlePlaceOrder = async (order: Order) => {
    console.log("Placing order", order);
    try {
      const response = await createOrder("user-id", order);
      console.log("Order placed", response);
      refresh();
      toast("Order placed");
    } catch (error) {
      console.error("Error placing order", error);
      if (error) toast(error.toString());
    }
  };

  const handleOpenPlaceModal = () => {
    setOpenPlaceModal(true);
  };

  const handleClosePlaceModal = () => {
    setOpenPlaceModal(false);
  };

  const handleViewOrder = async (order: Order) => {
    console.log("Canceling order", order);
    try {
      const response = await cancelOrder("user-id", order);
      console.log("Order canceled", response);
      refresh();
      toast("Order Canceled");
    } catch (error: Error | any) {
      console.error("Error canceling order", error);
      if (error) toast(error?.message.toString());
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
        refresh();
        toast("Order deleted");
      } catch (error) {
        console.error("Error deleting order", error);
        if (error) toast(error.toString());
      }
    }

    handleCloseDeleteModal();
  };

  const handleExport = (type: string) => {
    console.log("Exporting orders", type);
    try {
      ExportSheet({ data: orders, fileType: type as "csv" | "xlsx" });
      toast("Orders exported");
    } catch (error) {
      console.error("Error exporting orders", error);
      if (error) toast(error.toString());
    }
  };

  const handlePrint = async (id: string) => {
    console.log("Print order invoice", id);
    try {
      const response = await fetchOrderInvoiceById("user-id", id);
      // console.log("Order invoice printed", response);
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(response);
        newTab.stop();
      }
    } catch (error) {
      console.error("Error printing order invoice", error);
      if (error) toast(error.toString());
    }
  };

  if (loading && isEmpty) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Orders</Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          <Button
            variant="outlined"
            // color="inherit"
            startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
            onClick={exportPopover.handleOpen}
            ref={exportPopover.anchorRef}
          >
            Export
          </Button>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={handleOpenPlaceModal}
          >
            Place New Order
          </Button>
        </Stack>
      </Stack>

      <Card sx={{ p: 2, display: "flex", gap: 2 }}>
        <TableFilters
          placeholder="Search orders"
          value={searched}
          onChange={(searchVal) => setSearched(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />

        <StatusFilters
          filterType={filterStatus}
          onChangeFilter={(filterType: StatusFilterType) =>
            setFilterStatus(filterType)
          }
        />
      </Card>

      <OrdersTable
        count={ordersToDisplay.length}
        page={page}
        rows={paginatedOrders}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onSelect={handleOpenViewModal}
        onDelete={handleOpenDeleteModal}
      />

      <PlaceOrderModal
        open={openPlaceModal}
        onClose={handleClosePlaceModal}
        onSubmit={handlePlaceOrder}
      />

      {selectedViewOrder && (
        <ViewOrderModal
          open={openViewModal}
          onClose={handleCloseViewModal}
          order={selectedViewOrder}
          onSubmit={handleViewOrder}
          onPrint={handlePrint}
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

      <ToastContainer limit={1} pauseOnHover={false} closeOnClick />
    </Stack>
  );
}
