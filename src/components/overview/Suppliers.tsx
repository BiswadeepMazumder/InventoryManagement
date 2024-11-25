import React from "react";
import { useRouter } from "next/navigation";

import { ArrowCircleRight as ArrowCircleRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowCircleRight";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps } from "@mui/material/styles";

export interface Supplier {
  id: string | undefined;
  image: string;
  name: string;
  address: string;
}

export interface SuppliersProps {
  suppliers?: Supplier[];
  sx?: SxProps;
}

export function Suppliers({
  suppliers = [],
  sx,
}: SuppliersProps): React.JSX.Element {
  const router = useRouter();

  const handleViewAll = () => {
    router.push("dashboard/suppliers");
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Suppliers" />
      <Divider />
      <List>
        {suppliers.map((supplier, index) => (
          <ListItem divider={index < suppliers.length - 1} key={supplier.id}>
            <ListItemAvatar>
              {supplier.image ? (
                <Box
                  component="img"
                  src={supplier.image}
                  sx={{ borderRadius: 1, height: "48px", width: "48px" }}
                />
              ) : (
                <Box
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "var(--mui-palette-neutral-200)",
                    height: "48px",
                    width: "48px",
                  }}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={supplier.name}
              primaryTypographyProps={{ variant: "subtitle1" }}
              secondary={supplier.address}
              secondaryTypographyProps={{ variant: "body2" }}
            />
            <IconButton edge="end" onClick={handleViewAll}>
              <ArrowCircleRightIcon weight="bold" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
          onClick={handleViewAll}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
