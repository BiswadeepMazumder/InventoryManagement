import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";

type TableFiltersProps = {
  value: string;
  defaultValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onCancelSearch: () => void;
};

const TableFilters = ({
  value,
  defaultValue = "",
  placeholder = "",
  onChange,
  onCancelSearch,
}: TableFiltersProps): React.JSX.Element => {
  return (
    <OutlinedInput
      value={value}
      defaultValue={defaultValue}
      fullWidth
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      sx={{ maxWidth: "500px" }}
      startAdornment={
        <InputAdornment position="start">
          <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
        </InputAdornment>
      }
      endAdornment={
        value && (
          <InputAdornment position="end">
            <XIcon
              fontSize="var(--icon-fontSize-md)"
              onClick={onCancelSearch}
              style={{ cursor: "pointer" }}
            />
          </InputAdornment>
        )
      }
    />
  );
};

export default TableFilters;
