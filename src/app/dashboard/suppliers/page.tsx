"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import SuppliersTable from "@/components/supplier/SuppliersTable";
import TableFilters from "@/components/table/TableFilters";
import CreateSupplierModal from "@/components/supplier/CreateSupplierModal";
import UpdateSupplierModal from "@/components/supplier/UpdateSupplierModal";
import DeleteSupplierModal from "@/components/supplier/DeleteSupplierModal";
import ExportPopover from "@/components/table/ExportPopover";

import { Supplier } from "@/types/supplier";

import useFetchSuppliers from "@/hooks/useFetchSuppliers";
import usePopover from "@/hooks/usePopover";

import ExportSheet from "@/utils/export-sheet";

import {
  createSupplier,
  deleteSupplier,
  updateSupplier,
} from "@/services/supplier.services";

const applyPagination = (
  rows: Supplier[],
  page: number,
  rowsPerPage: number,
): Supplier[] => {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
};

export default function Page(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searched, setSearched] = useState<string>("");

  const [selectedUpdateSupplier, setSelectedUpdateSupplier] =
    useState<Supplier>();
  const [selectedDeleteSuppliers, setSelectedDeleteSuppliers] = useState<
    Supplier[]
  >([]);
  const [searchSuppliers, setSearchSuppliers] = useState<Supplier[]>([]);

  const exportPopover = usePopover<HTMLDivElement>();
  const { suppliers, loading } = useFetchSuppliers("user-id");

  const suppliersToDisplay = searched ? searchSuppliers : suppliers;
  const paginatedSuppliers = applyPagination(
    suppliersToDisplay,
    page,
    rowsPerPage,
  );

  useEffect(() => {
    const filteredRows = suppliers.filter((row) => {
      const searchValue = searched.toLowerCase();
      return (
        row.supplierName.toLowerCase().includes(searchValue) ||
        row.supplierAddress.toLowerCase().includes(searchValue) ||
        row.supplierCity.toLowerCase().includes(searchValue) ||
        row.supplierZipCode.toString().includes(searchValue) ||
        row.supplierPhoneNumber.toString().includes(searchValue)
      );
    });

    setSearchSuppliers(filteredRows);
  }, [searched]);

  const cancelSearch = () => {
    setSearched("");
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateSupplier = async (supplier: Supplier) => {
    console.log("Creating supplier", supplier);
    try {
      const response = await createSupplier("user-id", supplier);
      console.log("Supplier created", response);
      toast(response.toString());
    } catch (error) {
      console.error("Error creating supplier", error);
      if (error) toast(error.toString());
    }
  };

  const handleOpenUpdateModal = (supplier: Supplier) => {
    setSelectedUpdateSupplier(supplier);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateSupplier = async (supplier: Supplier) => {
    console.log("Updating supplier", supplier);
    try {
      const response = await updateSupplier("user-id", supplier);
      console.log("Supplier updated", response);
      toast(response.toString());
    } catch (error) {
      console.error("Error updating supplier", error);
      if (error) toast(error.toString());
    }
  };

  const handleOpenDeleteModal = (suppliers: Supplier[]) => {
    setSelectedDeleteSuppliers(suppliers);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteSupplier = async () => {
    console.log("Deleting suppliers", selectedDeleteSuppliers);
    for (const supplier of selectedDeleteSuppliers) {
      console.log("Deleting supplier", supplier);
      try {
        const response = await deleteSupplier("user-id", supplier.supplierId);
        console.log("Supplier deleted", response);
        toast(response.toString());
      } catch (error) {
        console.error("Error deleting supplier", error);
        if (error) toast(error.toString());
      }
    }

    handleCloseDeleteModal();
  };

  const handleExport = async (type: string) => {
    try {
      if (type) {
        ExportSheet({ data: suppliers, fileType: type as "csv" | "xlsx" });
        toast("Suppliers exported");
      }
    } catch (error) {
      console.error("Error exporting suppliers", error);
      if (error) toast(error.toString());
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Suppliers</Typography>
        </Stack>
        <div>
          <Button
            color="inherit"
            startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
            onClick={exportPopover.handleOpen}
            ref={exportPopover.anchorRef}
          >
            Export
          </Button>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={handleOpenCreateModal}
          >
            Add
          </Button>
        </div>
      </Stack>

      <Card sx={{ p: 2, display: "flex", gap: 2 }}>
        <TableFilters
          placeholder="Search suppliers"
          value={searched}
          onChange={(searchVal) => setSearched(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
      </Card>

      <SuppliersTable
        count={paginatedSuppliers.length}
        page={page}
        rows={paginatedSuppliers}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onUpdate={handleOpenUpdateModal}
        onDelete={handleOpenDeleteModal}
      />

      <CreateSupplierModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateSupplier}
      />

      {selectedUpdateSupplier && (
        <UpdateSupplierModal
          open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateSupplier}
          supplier={selectedUpdateSupplier}
        />
      )}

      <DeleteSupplierModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onSubmit={handleDeleteSupplier}
      />

      <ExportPopover
        anchorEl={exportPopover.anchorRef.current}
        onClose={exportPopover.handleClose}
        open={exportPopover.open}
        onClick={handleExport}
      />

      <ToastContainer />
    </Stack>
  );
}
