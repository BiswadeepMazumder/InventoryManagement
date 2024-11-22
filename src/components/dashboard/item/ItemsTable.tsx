import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Tooltip from "@mui/material/Tooltip";

import EnhancedTableToolbar from "@/components/table/EnhancedTableToolbar";
import useSelection from "@/hooks/useSelection";
import { Item } from "@/types/item";
import Chip from "@mui/material/Chip";

import { ORDER_STATUS } from "@/constants/order";

interface ItemsTableProps {
  count?: number;
  page?: number;
  rows?: Item[];
  rowsPerPage?: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: (item: Item) => void;
  onDelete: (items: Item[]) => void;
}

const ItemsTable = ({
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
    return rows.map((item) => item.itemId);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const handleDeleteItem = () => {
    onDelete(
      Array.from(selected).map(
        (id) => rows.find((row) => row.itemId === id) as Item,
      ),
    );

    deselectAll();
  };

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <EnhancedTableToolbar
          title="All Items"
          numSelected={selected.size}
          onDelete={handleDeleteItem}
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
              <TableCell>Item Name</TableCell>
              <TableCell>Item Unit Price</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category Code</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.itemId);

              const { label, color } = ORDER_STATUS[
                row.status as 0 | 1 | 2 | 3 | 4 | 5
              ] ?? {
                label: "Unknown",
                color: "default",
              };

              return (
                <TableRow hover key={row.itemId} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.itemId);
                        } else {
                          deselectOne(row.itemId);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{ alignItems: "center" }}
                      direction="row"
                      spacing={2}
                    >
                      <Typography variant="subtitle2">
                        {row.itemName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.itemUnitPrice}</TableCell>
                  <TableCell>{row.currentStock}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                  <TableCell>{row.categoryCode}</TableCell>
                  <TableCell padding="none">
                    <Tooltip title="Edit item">
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

export default ItemsTable;
