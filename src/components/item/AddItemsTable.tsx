import React, { useState } from "react";

import {
  Box,
  Card,
  Chip,
  Divider,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Table,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import { Item } from "@/types/item";
import { ITEM_CATEGORY, ITEM_STATUS } from "@/constants/item";
import { formatNumberWithCommas } from "@/utils/format";

interface AddItemsTableProps {
  count?: number;
  page?: number;
  rows?: Item[];
  rowsPerPage?: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (item: Item, quantity: number) => void;
}

const AddItemsTable = ({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onPageChange,
  onRowsPerPageChange,
  onAdd,
}: AddItemsTableProps): React.JSX.Element => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (
    itemId: string,
    value: string,
    currentStock: number,
  ) => {
    // limit the quantity to be a positive integer
    if (parseInt(value) < 0) {
      return;
    }

    // limit the quantity to be less than or equal to the current stock
    if (parseInt(value) > currentStock) {
      return;
    }

    // update the quantity in the state
    setQuantities((prev) => ({
      ...prev,
      [itemId]: parseInt(value, 10) || 0,
    }));
  };

  const handleAdd = (item: Item, quantity: number) => {
    onAdd(item, quantity);
    setQuantities((prev) => ({
      ...prev,
      [item.itemId]: 0,
    }));
  };

  return (
    <Card variant="outlined">
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Current Stock</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Category Code</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const { label: statusLabel, color: statusColor } = ITEM_STATUS[
                row.status as 0 | 1
              ] ?? {
                label: "Unknown",
                color: "default",
              };

              const { label: categoryLabel } = ITEM_CATEGORY[
                row.categoryCode as keyof typeof ITEM_CATEGORY
              ] ?? {
                label: "Unknown",
              };

              return (
                <TableRow hover key={row.itemId}>
                  <TableCell>
                    <Stack
                      sx={{ alignItems: "center" }}
                      direction="row"
                      spacing={2}
                    >
                      <Tooltip title={row.itemId}>
                        <Typography variant="subtitle2">
                          {row.itemName}
                        </Typography>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    {formatNumberWithCommas(row.itemUnitPrice)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumberWithCommas(row.currentStock)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      color={statusColor}
                      label={statusLabel}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{categoryLabel}</TableCell>
                  <TableCell align="center" padding="none">
                    <TextField
                      type="number"
                      value={quantities[row.itemId] || ""}
                      onChange={(e) =>
                        handleQuantityChange(
                          row.itemId,
                          e.target.value,
                          row.currentStock,
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="button">
                      $
                      {formatNumberWithCommas(
                        row.itemUnitPrice * (quantities[row.itemId] || 0),
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleAdd(row, quantities[row.itemId] || 1)
                      }
                    >
                      <ControlPointIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default AddItemsTable;
