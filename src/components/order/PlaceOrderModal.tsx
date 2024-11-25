import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useFetchItems from "@/hooks/useFetchItems";

import { OrderItems } from "@/types/order";
import { Item } from "@/types/item";
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

interface PlaceOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
}

export default function PlaceOrderModal({
  open,
  onClose,
  onSubmit,
}: PlaceOrderModalProps) {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const [orderItemPage, setOrderItemPage] = useState(0);
  const [orderItemRowsPerPage, setOrderItemRowsPerPage] = useState(5);

  const orderId = watch("orderId");
  const orderDate = watch("orderDate");
  const orderAmount = watch("orderAmount");
  const userId = watch("userId");
  const orderItems = watch("orderItems");
  const paginatedOrders = applyOrderItemsPagination(
    orderItems,
    orderItemPage,
    orderItemRowsPerPage,
  );

  const { items, loading: itemsLoading } = useFetchItems("user-id");
  const [itemPage, setItemPage] = useState(0);
  const [itemRowsPerPage, setItemRowsPerPage] = useState(5);

  const [filterItems, setFilterItems] = useState<Item[]>([]);

  const [searched, setSearched] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState(StatusFilterType.None);
  const [filterCategoryCode, setFilterCategoryCode] = useState(
    CategoryCodeFilterType.None,
  );

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

  useEffect(() => {
    setValue("userId", "user-id");
  }, [setValue]);

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

  const handlePlaceOrder = (values: Values) => {
    console.log("Place Order", values);
    onSubmit(values);
    onClose();
  };

  const handleAddItem = (item: Item, quantity: number) => {
    console.log("Add item", item, quantity);
    // Add item to order items when item id is the same thing
    // Else, add new item to order items
    const orderId = getValues("orderId");
    const orderItems = getValues("orderItems") as OrderItems[];
    const newOrderItems = [...orderItems];
    const existingOrderItem = newOrderItems.find(
      (orderItem) => orderItem.itemId === item.itemId,
    );

    if (existingOrderItem) {
      // Update existing order item
      existingOrderItem.itemCount += quantity;
      existingOrderItem.totalPrice += item.itemUnitPrice * quantity;
      setValue("orderItems", newOrderItems, { shouldDirty: true });
    } else {
      const newOrderItem = {
        orderId: orderId,
        itemId: item.itemId,
        orderDate: dayjs().toISOString(),
        itemCount: quantity,
        itemName: item.itemName,
        totalPrice: item.itemUnitPrice * quantity,
        orderStatus: 1,
      };
      newOrderItems.push(newOrderItem);
    }

    setValue("orderItems", newOrderItems, { shouldDirty: true });

    // Calculate order amount
    const orderAmount = newOrderItems.reduce((acc, orderItem) => {
      return acc + orderItem.totalPrice;
    }, 0);
    setValue("orderAmount", orderAmount, { shouldDirty: true });
    clearErrors("orderAmount");

    toast.success(`${quantity} ${item.itemName} added to order`);
  };

  const handleClose = (_event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };

  const handleOrderItemPageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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
    _event: React.MouseEvent<HTMLButtonElement> | null,
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

  return (
    <form onSubmit={handleSubmit(handlePlaceOrder)}>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        maxWidth="lg"
        fullWidth
        disablePortal // Fix dialog rendering issue with the form tag
      >
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Stack>
              <Controller
                control={control}
                name="orderName"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.orderName)}>
                    <InputLabel>Order Name</InputLabel>
                    <OutlinedInput {...field} label="orderName" />
                    {errors.orderName ? (
                      <FormHelperText>
                        {errors.orderName.message}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Typography variant="body1">
                  <strong>Order Id:</strong> {orderId}
                </Typography>
                <Typography variant="body1">
                  <strong>Date:</strong> {formatDate(orderDate)}
                </Typography>
              </Stack>

              <Stack spacing={2} sx={{ flex: 1 }}>
                <Stack direction="row" gap={2}>
                  <Typography variant="body1">
                    <strong>Amount:</strong>{" "}
                    {formatNumberWithCommas(orderAmount)}
                  </Typography>
                  {errors.orderAmount && (
                    <Typography variant="body1" color="error">
                      {errors.orderAmount.message}
                    </Typography>
                  )}
                </Stack>

                <Typography variant="body1">
                  <strong>User:</strong> {userId}
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
            </Card>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button type="submit">Place Order</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
