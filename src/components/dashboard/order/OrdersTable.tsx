import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";

import EnhancedTableToolbar from "@/components/table/EnhancedTableToolbar";
import useSelection from "@/hooks/useSelection";
import { Order } from "@/types/order";

interface ItemsTableProps {
  count?: number;
  page?: number;
  rows?: Order[];
  rowsPerPage?: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: (order: Order) => void;
  onDelete: (orders: Order[]) => void;
}

const OrdersTable = ({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onPageChange,
  onRowsPerPageChange,
  onUpdate,
  onDelete,
}: ItemsTableProps): React.JSX.Element => {
  const rowIds = React.useMemo(() => {
    return rows.map((item) => item.orderId);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const handleDeleteOrder = () => {
    onDelete(
      Array.from(selected).map(
        (orderId) => rows.find((order) => order.orderId === orderId) as Order,
      ),
    );

    deselectAll();
  };

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <EnhancedTableToolbar
          title="All Orders"
          numSelected={selected.size}
          onDelete={handleDeleteOrder}
        />
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Order Id</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Order Name</TableCell>
              <TableCell>Order Amount</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Cancel Comment</TableCell>
              <TableCell>User Id</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.orderId);

              return (
                <TableRow hover key={row.orderId} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.orderId);
                        } else {
                          deselectOne(row.orderId);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.orderId}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.orderDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.orderName}</Typography>
                  </TableCell>
                  <TableCell>{row.orderAmount}</TableCell>
                  <TableCell>{row.orderStatus}</TableCell>
                  <TableCell>{row.cancelComment}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell padding="none">
                    <Tooltip title="Edit order">
                      <IconButton onClick={() => onUpdate(row)}>
                        <EditNoteIcon />
                      </IconButton>
                    </Tooltip>
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

export default OrdersTable;
