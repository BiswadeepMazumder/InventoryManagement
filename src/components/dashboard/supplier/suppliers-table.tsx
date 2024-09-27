import * as React from "react";
import Avatar from "@mui/material/Avatar";
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

import { useSelection } from "@/hooks/use-selection";
import { Supplier } from "@/types/supplier";

interface SuppliersTableProps {
  count?: number;
  page?: number;
  rows?: Supplier[];
  rowsPerPage?: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SuppliersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onPageChange,
  onRowsPerPageChange,
}: SuppliersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((item) => item.supplierId);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
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
              <TableCell>Supplier Name</TableCell>
              <TableCell>Supplier Address</TableCell>
              <TableCell>Supplier City</TableCell>
              <TableCell>Supplier Zip Code</TableCell>
              <TableCell>Supplier Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.supplierId);

              return (
                <TableRow hover key={row.supplierId} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.supplierId);
                        } else {
                          deselectOne(row.supplierId);
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
                      {/*<Avatar src={row.avatar} />*/}
                      <Typography variant="subtitle2">
                        {row.supplierName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.supplierAddress}</TableCell>
                  <TableCell>{row.supplierCity}</TableCell>
                  <TableCell>{row.supplierZipCode}</TableCell>
                  <TableCell>{row.supplierPhoneNumber}</TableCell>
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
}
