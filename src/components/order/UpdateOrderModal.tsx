import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Order, OrderItems } from "@/types/order";
import { schema, defaultValues, Values } from "@/components/order/schema";
import { ORDER_STATUS } from "@/constants/order";
import OrderItemsTable from "@/components/order/OrderItemsTable";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Item } from "@/types/item";
import useFetchItems from "@/hooks/useFetchItems";
import AddItemsTable from "@/components/item/AddItemsTable";
import TableFilters from "@/components/table/TableFilters";
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
type UpdateOrderModalProps = {
  order: Order;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
};

export default function UpdateOrderModal({
  order,
  open,
  onClose,
  onSubmit,
}: UpdateOrderModalProps) {
  const {
    control,
    handleSubmit,
    setError,
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
    setValue("orderId", order.orderId);
    setValue("orderDate", order.orderDate);
    setValue("orderName", order.orderName);
    setValue("userId", order.userId);
    setValue("orderAmount", order.orderAmount);
    setValue("orderStatus", order.orderStatus);
    setValue("cancelComment", order.cancelComment);
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

  const handleUpdateOrder = (values: Values) => {
    console.log("Update order", values);
    onSubmit(values);
    onClose();
  };

  const handleAddItem = (item: Item) => {
    console.log("Add item", item);
    // Add item to order items
    const orderItems = getValues("orderItems") as OrderItems[];
    const newOrderItems = [
      ...orderItems,
      {
        orderId: order.orderId,
        itemId: item.itemId,
        orderDate: new Date().toISOString(),
        itemCount: 1,
        itemName: item.itemName,
        totalPrice: item.itemUnitPrice,
        orderStatus: 0,
      },
    ];
    setValue("orderItems", newOrderItems, { shouldDirty: true });
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Update Order</DialogTitle>
      <form onSubmit={handleSubmit(handleUpdateOrder)}>
        <DialogContent>
          <Stack spacing={2}>
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="orderId"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.orderId)}>
                      <InputLabel>Order Id</InputLabel>
                      <OutlinedInput {...field} label="orderId" disabled />
                      {errors.orderId ? (
                        <FormHelperText>
                          {errors.orderId.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />

                <Controller
                  control={control}
                  name="orderAmount"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.orderAmount)}>
                      <InputLabel>Order Amount</InputLabel>
                      <OutlinedInput
                        {...field}
                        label="orderAmount"
                        type="number"
                      />
                      {errors.orderAmount ? (
                        <FormHelperText>
                          {errors.orderAmount.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />
              </Stack>

              <Stack spacing={2} sx={{ flex: 1 }}>
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

                <Controller
                  control={control}
                  name="orderStatus"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.orderStatus)}>
                      <InputLabel>Order Status</InputLabel>
                      <Select {...field} label="orderStatus">
                        <MenuItem value={0}>{ORDER_STATUS[0].label}</MenuItem>
                        <MenuItem value={1}>{ORDER_STATUS[1].label}</MenuItem>
                        <MenuItem value={2}>{ORDER_STATUS[2].label}</MenuItem>
                        <MenuItem value={3}>{ORDER_STATUS[3].label}</MenuItem>
                        <MenuItem value={4}>{ORDER_STATUS[4].label}</MenuItem>
                        <MenuItem value={5}>{ORDER_STATUS[5].label}</MenuItem>
                      </Select>
                      {errors.orderStatus ? (
                        <FormHelperText>
                          {errors.orderStatus.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />
              </Stack>
            </Stack>

            <Stack>
              <Controller
                control={control}
                name="cancelComment"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.cancelComment)}>
                    <InputLabel>Cancel Comment</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="cancelComment"
                      type="string"
                    />
                    {errors.cancelComment ? (
                      <FormHelperText>
                        {errors.cancelComment.message}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
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
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">
                    Add to Order Items
                  </Typography>
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
                          onChange={(searchVal: string) =>
                            setSearched(searchVal)
                          }
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
                          onChangeFilter={(
                            filterType: CategoryCodeFilterType,
                          ) => setFilterCategoryCode(filterType)}
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
          <Button type="submit" autoFocus>
            Update order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
