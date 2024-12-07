import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { OrderItems } from "@/types/order";
import { formatNumberWithCommas } from "@/utils/format";

interface OrderItemsTableProps {
  count?: number;
  page?: number;
  rows?: OrderItems[];
  rowsPerPage?: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OrderItemsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onPageChange,
  onRowsPerPageChange,
}: OrderItemsTableProps) {
  return (
    <Card variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item Id</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Item Count</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.itemId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.itemId}</TableCell>
              <TableCell component="th" scope="row">
                {row.itemName}
              </TableCell>
              <TableCell align="right">
                {formatNumberWithCommas(row.itemCount)}
              </TableCell>
              <TableCell align="right">
                {formatNumberWithCommas(parseFloat(row.totalPrice.toFixed(2)))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
}
