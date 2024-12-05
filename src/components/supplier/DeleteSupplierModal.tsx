import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DeleteOrderModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const DeleteOrderModal = ({
  open,
  onClose,
  onSubmit,
}: DeleteOrderModalProps) => {
  const handleClose = (_event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">Delete supplier</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this supplier?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(event) => handleClose(event, "button")}>Close</Button>
        <Button onClick={onSubmit} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteOrderModal;
