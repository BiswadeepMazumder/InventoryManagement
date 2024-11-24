import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { Item } from "@/types/item";
import Chip from "@mui/material/Chip";

import { ITEM_CATEGORY, ITEM_STATUS } from "@/constants/item";
import { IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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
  onAdd: (item: Item) => void;
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
  return (
    <Card variant="outlined">
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
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
                      <Typography variant="subtitle2">
                        {row.itemName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.itemUnitPrice}</TableCell>
                  <TableCell>{row.currentStock}</TableCell>
                  <TableCell>
                    <Chip
                      color={statusColor}
                      label={statusLabel}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{categoryLabel}</TableCell>
                  <TableCell padding="none">
                    <IconButton onClick={() => onAdd(row)}>
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
