import React from "react";

import { MenuItem, TextField } from "@mui/material";
import { ORDER_STATUS } from "@/constants/order";

const FILTER_OPTIONS = [
  {
    label: "None",
    value: -1,
  },
  {
    label: ORDER_STATUS["0"].label,
    value: ORDER_STATUS["0"].value,
  },
  {
    label: ORDER_STATUS["1"].label,
    value: ORDER_STATUS["1"].value,
  },
  {
    label: ORDER_STATUS["2"].label,
    value: ORDER_STATUS["2"].value,
  },
  {
    label: ORDER_STATUS["3"].label,
    value: ORDER_STATUS["3"].value,
  },
  {
    label: ORDER_STATUS["4"].label,
    value: ORDER_STATUS["4"].value,
  },
  {
    label: ORDER_STATUS["5"].label,
    value: ORDER_STATUS["5"].value,
  },
];

export enum FilterType {
  None = -1,
  OrderCanceled = ORDER_STATUS["0"].value,
  OrderPlaced = ORDER_STATUS["1"].value,
  OrderAccepted = ORDER_STATUS["2"].value,
  OrderReady = ORDER_STATUS["3"].value,
  OrderInTransit = ORDER_STATUS["4"].value,
  OrderDelivered = ORDER_STATUS["5"].value,
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
