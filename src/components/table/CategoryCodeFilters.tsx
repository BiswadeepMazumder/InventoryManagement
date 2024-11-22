import React from "react";

import { MenuItem, TextField } from "@mui/material";

const FILTER_OPTIONS = [
  {
    label: "None",
    value: -1,
  },
  {
    label: "AB",
    value: "AB",
  },
  {
    label: "CD",
    value: "CD",
  },
  {
    label: "CF",
    value: "CF",
  },
  {
    label: "PP",
    value: "PP",
  },
  {
    label: "PS",
    value: "PS",
  },
  {
    label: "TO",
    value: "TO",
  },
  {
    label: "WT",
    value: "WT",
  },
];

export enum FilterType {
  None = -1,
  AB = "AB",
  CD = "CD",
  CF = "CF",
  PP = "PP",
  PS = "PS",
  TO = "TO",
  WT = "WT",
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
      label="Category Code"
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
