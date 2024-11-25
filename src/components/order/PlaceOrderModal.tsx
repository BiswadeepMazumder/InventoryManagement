import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useFetchItems from "@/hooks/useFetchItems";

import { Order, OrderItems } from "@/types/order";
import { Item } from "@/types/item";
import { ORDER_STATUS } from "@/constants/order";
import { formatDate, formatNumberWithCommas } from "@/utils/format";

import { schema, defaultValues, Values } from "@/components/order/schema";
import AddItemsTable from "@/components/item/AddItemsTable";
import TableFilters from "@/components/table/TableFilters";
import OrderItemsTable from "@/components/order/OrderItemsTable";
import ItemStatusFilters, {
  FilterType as StatusFilterType,
} from "@/components/table/ItemStatusFilters";
import ItemCategoryCodeFilters, {
  FilterType as CategoryCodeFilterType,
} from "@/components/table/ItemCategoryCodeFilters";

const applyOrderItemsPagination = (
  rows: OrderItems[],
  page: number,
  rowsPerPage: number,
): OrderItems[] => {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

const applyItemsPagination = (
  rows: Item[],
  page: number,
  rowsPerPage: number,
): Item[] => {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};
type PlaceOrderModalProps = {
  order: Order;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
};

export default function PlaceOrderModal({
  order,
  open,
  onClose,
  onSubmit,
}: PlaceOrderModalProps) {
  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const [orderItemPage, setOrderItemPage] = useState(0);
  const [orderItemRowsPerPage, setOrderItemRowsPerPage] = useState(5);

  const orderItems = watch("orderItems");
  const paginatedOrders = applyOrderItemsPagination(
    orderItems,
    orderItemPage,
    orderItemRowsPerPage,
  );

  useEffect(() => {
    setValue("orderItems", order.orderItems);
  }, [order]);

  const { items, loading: itemsLoading } = useFetchItems("user-id");
  const [itemPage, setItemPage] = useState(0);
  const [itemRowsPerPage, setItemRowsPerPage] = useState(5);

  const [filterItems, setFilterItems] = useState<Item[]>([]);

  const [searched, setSearched] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState(StatusFilterType.None);
  const [filterCategoryCode, setFilterCategoryCode] = useState(
    CategoryCodeFilterType.None,
  );

  const isEmpty = items.length === 0;
  const isSearch = searched.length > 0;
  const isFilteredStatus = filterStatus !== StatusFilterType.None;
  const isFilteredCategoryCode =
    filterCategoryCode !== CategoryCodeFilterType.None;

  const itemsToDisplay =
    isSearch || isFilteredStatus || isFilteredCategoryCode
      ? filterItems
      : items;
  const paginatedItems = applyItemsPagination(
    itemsToDisplay,
    itemPage,
    itemRowsPerPage,
  );

  // Filter items based on search text or status or category code
  useEffect(() => {
    const filteredRows = items.filter((row) => {
      const results = [];

      // search text
      if (searched) {
        const searchValue = searched.toLowerCase();
        const _row = row.itemName.toLowerCase().includes(searchValue);
        results.push(_row);
      }

      // status filter
      if (filterStatus !== StatusFilterType.None) {
        const _row = row.status === filterStatus;
        results.push(_row);
      }

      // category code filter
      if (filterCategoryCode !== CategoryCodeFilterType.None) {
        const _row = row.categoryCode === filterCategoryCode;
        results.push(_row);
      }

      return results.every((result) => result);
    });

    setFilterItems(filteredRows);
    setItemPage(0);
  }, [items, searched, filterStatus, filterCategoryCode]);

  const handlePlaceOrder = () => {
    const orderItems = getValues("orderItems") as OrderItems[];
    const PlacedOrder = {
      ...order,
      orderItems,
    };
    console.log("Place Order", PlacedOrder);
    onSubmit(PlacedOrder);
    onClose();
  };

  const handleAddItem = (item: Item, quantity: number) => {
    console.log("Add item", item, quantity);
    // Add item to order items when item id is the same thing
    // Else, add new item to order items
    const orderItems = getValues("orderItems") as OrderItems[];
    const newOrderItems = [...orderItems];
    const existingItem = newOrderItems.find(
      (orderItem) => orderItem.itemId === item.itemId,
    );

    if (existingItem) {
      const newQuantity = existingItem.itemCount + quantity;
      const newTotalPrice =
        existingItem.totalPrice + item.itemUnitPrice * quantity;
      const updatedItem = {
        ...existingItem,
        itemCount: newQuantity,
        totalPrice: newTotalPrice,
      };
      const index = newOrderItems.findIndex(
        (orderItem) => orderItem.itemId === item.itemId,
      );
      newOrderItems[index] = updatedItem;
    } else {
      const newOrderItem = {
        orderId: order.orderId,
        itemId: item.itemId,
        orderDate: dayjs().toISOString(),
        itemCount: quantity,
        itemName: item.itemName,
        totalPrice: item.itemUnitPrice * quantity,
        orderStatus: 0,
      };
      newOrderItems.push(newOrderItem);
    }

    setValue("orderItems", newOrderItems, { shouldDirty: true });
    toast.success("Item added to order");
  };

  const handleClose = (_event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };

  const handleOrderItemPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setOrderItemPage(newPage);
  };

  const handleOrderItemRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOrderItemRowsPerPage(parseInt(event.target.value, 10));
    setOrderItemPage(0);
  };

  const handleItemPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setItemPage(newPage);
  };

  const handleItemRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setItemRowsPerPage(parseInt(event.target.value, 10));
    setItemPage(0);
  };

  const cancelSearch = () => {
    setSearched("");
  };

  const { label, color } = ORDER_STATUS[
    order.orderStatus as 0 | 1 | 2 | 3 | 4 | 5
  ] ?? {
    label: "Unknown",
    color: "default",
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>Place Order</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <Stack spacing={2} sx={{ flex: 1 }}>
              <Typography variant="body1">
                <strong>Name:</strong> {order.orderName}
              </Typography>
              <Typography variant="body1">
                <strong>Date:</strong> {formatDate(order.orderDate)}
              </Typography>
            </Stack>

            <Stack spacing={2} sx={{ flex: 1 }}>
              <Typography variant="body1">
                <strong>Amount:</strong> $
                {formatNumberWithCommas(order.orderAmount)}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong>{" "}
                <Chip color={color} label={label} size="small" />
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <OrderItemsTable
              count={orderItems.length}
              page={orderItemPage}
              rows={paginatedOrders}
              rowsPerPage={orderItemRowsPerPage}
              onPageChange={handleOrderItemPageChange}
              onRowsPerPageChange={handleOrderItemRowsPerPageChange}
            />
          </Stack>

          <Card variant="outlined">
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Add to Order Items</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {itemsLoading ? (
                  <div>Loading...</div>
                ) : (
                  <Stack spacing={2}>
                    <Card
                      variant="outlined"
                      sx={{ p: 2, display: "flex", gap: 2 }}
                    >
                      <TableFilters
                        placeholder="Search items"
                        value={searched}
                        onChange={(searchVal: string) => setSearched(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                      />

                      <ItemStatusFilters
                        filterType={filterStatus}
                        onChangeFilter={(filterType: StatusFilterType) =>
                          setFilterStatus(filterType)
                        }
                      />

                      <ItemCategoryCodeFilters
                        filterType={filterCategoryCode}
                        onChangeFilter={(filterType: CategoryCodeFilterType) =>
                          setFilterCategoryCode(filterType)
                        }
                      />
                    </Card>
                    <AddItemsTable
                      count={itemsToDisplay.length}
                      page={itemPage}
                      rows={paginatedItems}
                      rowsPerPage={itemRowsPerPage}
                      onPageChange={handleItemPageChange}
                      onRowsPerPageChange={handleItemRowsPerPageChange}
                      onAdd={handleAddItem}
                    />
                  </Stack>
                )}
              </AccordionDetails>
            </Accordion>
          </Card>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </DialogActions>
      <ToastContainer limit={2} />
    </Dialog>
  );
}
