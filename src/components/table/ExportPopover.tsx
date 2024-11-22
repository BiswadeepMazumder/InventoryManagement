import React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

import { FileCsv as FileCsvIcon } from "@phosphor-icons/react/dist/ssr/FileCsv";
import { FileXls as FileXlsIcon } from "@phosphor-icons/react/dist/ssr/FileXls";

export enum EXPORT_TYPES {
  CSV = "csv",
  EXCEL = "excel",
}

export interface ExportPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
  onClick: (type: string) => void;
}

const ExportPopover = ({
  anchorEl,
  onClose,
  open,
  onClick,
}: ExportPopoverProps) => {
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
    >
      <Button
        color="inherit"
        startIcon={<FileCsvIcon fontSize="var(--icon-fontSize-md)" />}
        onClick={() => onClick(EXPORT_TYPES.CSV as string)}
      >
        CSV
      </Button>
      <Button
        color="inherit"
        startIcon={<FileXlsIcon fontSize="var(--icon-fontSize-md)" />}
        onClick={() => onClick(EXPORT_TYPES.EXCEL as string)}
      >
        Excel
      </Button>
    </Popover>
  );
};

export default ExportPopover;
