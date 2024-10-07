import * as React from "react";

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
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";

import EnhancedTableToolbar from "@/components/table/EnhancedTableToolbar";
import useSelection from "@/hooks/useSelection";
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
  onUpdate: (supplier: Supplier) => void;
  onDelete: (suppliers: Supplier[]) => void;
}

const SuppliersTable = ({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onPageChange,
  onRowsPerPageChange,
  onUpdate,
  onDelete,
}: SuppliersTableProps): React.JSX.Element => {
  const rowIds = React.useMemo(() => {
    return rows.map((item) => item.supplierId);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const handleDeleteSupplier = () => {
    onDelete(
      Array.from(selected).map(
        (supplierId) =>
          rows.find(
            (supplier) => supplier.supplierId === supplierId,
          ) as Supplier,
      ),
    );

    deselectAll();
  };

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <EnhancedTableToolbar
          title="All Suppliers"
          numSelected={selected.size}
          onDelete={handleDeleteSupplier}
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
              <TableCell>Supplier Name</TableCell>
              <TableCell>Supplier Address</TableCell>
              <TableCell>Supplier City</TableCell>
              <TableCell>Supplier Zip Code</TableCell>
              <TableCell>Supplier Phone Number</TableCell>
              <TableCell></TableCell>
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
                  <TableCell padding="none">
                    <Tooltip title="Edit supplier">
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

export default SuppliersTable;
