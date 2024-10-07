import * as React from "react";

interface PopoverController<T> {
  anchorRef: React.MutableRefObject<T | null> | any; // use any to avoid type error with Button ref prop in MUI components
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  open: boolean;
}

export function usePopover<T = HTMLElement>(): PopoverController<T> {
  const anchorRef = React.useRef<T>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return { anchorRef, handleClose, handleOpen, handleToggle, open };
}

export default usePopover;
