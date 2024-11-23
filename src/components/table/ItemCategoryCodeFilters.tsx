import React from "react";

import { MenuItem, TextField } from "@mui/material";
import { ITEM_CATEGORY } from "@/constants/item";

const FILTER_OPTIONS = [
  {
    label: "None",
    value: -1,
  },
  {
    label: ITEM_CATEGORY["AB"].label,
    value: ITEM_CATEGORY["AB"].value,
  },
  {
    label: ITEM_CATEGORY["CD"].label,
    value: ITEM_CATEGORY["CD"].value,
  },
  {
    label: ITEM_CATEGORY["CF"].label,
    value: ITEM_CATEGORY["CF"].value,
  },
  {
    label: ITEM_CATEGORY["CH"].label,
    value: ITEM_CATEGORY["CH"].value,
  },
  {
    label: ITEM_CATEGORY["CK"].label,
    value: ITEM_CATEGORY["CK"].value,
  },
  {
    label: ITEM_CATEGORY["CO"].label,
    value: ITEM_CATEGORY["CO"].value,
  },
  {
    label: ITEM_CATEGORY["FZ"].label,
    value: ITEM_CATEGORY["FZ"].value,
  },
  {
    label: ITEM_CATEGORY["PP"].label,
    value: ITEM_CATEGORY["PP"].value,
  },
  {
    label: ITEM_CATEGORY["PS"].label,
    value: ITEM_CATEGORY["PS"].value,
  },
  {
    label: ITEM_CATEGORY["TO"].label,
    value: ITEM_CATEGORY["TO"].value,
  },
  {
    label: ITEM_CATEGORY["SU"].label,
    value: ITEM_CATEGORY["SU"].value,
  },
  {
    label: ITEM_CATEGORY["WT"].label,
    value: ITEM_CATEGORY["WT"].value,
  },
  {
    label: ITEM_CATEGORY["OD"].label,
    value: ITEM_CATEGORY["OD"].value,
  },
  {
    label: ITEM_CATEGORY["US"].label,
    value: ITEM_CATEGORY["US"].value,
  },
];

export enum FilterType {
  None = -1,
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
