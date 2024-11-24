import React from "react";

import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ITEM_STATUS } from "@/constants/item";
import { Item } from "@/types/item";

import { fetchItemById, fetchItems } from "@/services/item.services";

interface PageProps {
  params: { id: string };
}

export default async function Page({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const id = params.id;
  let item: Item | null = null;

  try {
    item = await fetchItemById("user-id", id);
  } catch (error) {
    console.error("Error fetching item", error);
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  const { label, color } = ITEM_STATUS[item.status as 0 | 1] ?? {
    label: "Unknown",
    color: "default",
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Item</Typography>
        </Stack>
      </Stack>

      <Card sx={{ p: 2, display: "flex", gap: 2 }}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h6">Name: {item.itemName}</Typography>
          <Typography variant="body1">Price: ${item.itemUnitPrice}</Typography>
          <Typography variant="body1">Stock: {item.currentStock}</Typography>
          <Typography variant="body1">
            Status: <Chip color={color} label={label} size="small" />
          </Typography>
          <Typography variant="body1">Category: {item.categoryCode}</Typography>
        </Stack>
      </Card>
    </Stack>
  );
}

export async function generateStaticParams() {
  const items = await fetchItems("user-id");

  return items.map((item: Item) => ({
    id: item.itemId,
  }));
}
