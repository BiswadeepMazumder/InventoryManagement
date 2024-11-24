export const ITEM_STATUS = {
  0: { label: "Product Unavailable", value: 0, color: "error" },
  1: { label: "Product Available", value: 1, color: "primary" },
} as const;

export const ITEM_CATEGORY = {
  AB: { label: "Alcoholic Beverage", value: "AB" },
  CD: { label: "Candy", value: "CD" },
  CF: { label: "Canned Food", value: "CF" },
  CH: { label: "Chip", value: "CH" },
  CK: { label: "Cake", value: "CK" },
  CO: { label: "Cookie", value: "CO" },
  FZ: { label: "Frozen Food", value: "FZ" },
  PP: { label: "Pop", value: "PP" },
  PS: { label: "Pet Supply", value: "PS" },
  TO: { label: "Toiletry", value: "TO" },
  SU: { label: "Supplier", value: "SU" },
  WT: { label: "Water", value: "WT" },
  OD: { label: "Order", value: "OD" },
  US: { label: "User", value: "US" },
} as const;
