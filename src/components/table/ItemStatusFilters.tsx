import React from "react";

import { MenuItem, TextField } from "@mui/material";
import { ITEM_STATUS } from "@/constants/item";

const FILTER_OPTIONS = [
  {
    label: "None",
    value: -1,
  },
  {
    label: ITEM_STATUS["0"].label,
    value: ITEM_STATUS["0"].value,
  },
  {
    label: ITEM_STATUS["1"].label,
    value: ITEM_STATUS["1"].value,
  },
];

export enum FilterType {
  None = -1,
  ProductUnavailable = 0,
  ProductAvailable = 1,
}

export type FiltersProps = {
  filterType: FilterType;
  onChangeFilter: (filterType: FilterType) => void;
};

const Filters = ({
  filterType,
  onChangeFilter,
}: FiltersProps): React.JSX.Element => {
  return (
    <TextField
      select
      value={filterType}
      onChange={(e) => onChangeFilter(e.target.value as any)}
      label="Status"
      defaultValue={FilterType.None}
      fullWidth
    >
      {FILTER_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Filters;
