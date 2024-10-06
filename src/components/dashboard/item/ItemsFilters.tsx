import * as React from "react";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";

type ItemsFiltersProps = {
  value: string;
  onChange: (value: string) => void;
  onCancelSearch: () => void;
};

export function ItemsFilters({
  value,
  onChange,
  onCancelSearch,
}: ItemsFiltersProps): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={value}
        defaultValue=""
        fullWidth
        placeholder="Search item"
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
    </Card>
  );
}
