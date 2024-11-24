import React from "react";
import { useRouter } from "next/navigation";

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import type { SxProps } from "@mui/material/styles";

import { ArrowUp as ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { ArrowDown as ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { CalendarCheck as CalendarCheckIcon } from "@phosphor-icons/react/dist/ssr/CalendarCheck";

export interface UpcomingOrderProps {
  diff?: number;
  trend?: "up" | "down";
  sx?: SxProps;
  value: string;
}

export function UpcomingOrder({
  diff,
  trend,
  value,
  sx,
}: UpcomingOrderProps): React.JSX.Element {
  const router = useRouter();

  const handleViewOrders = () => {
    router.push("dashboard/orders?filter=upcoming");
  };

  const TrendIcon = trend === "up" ? ArrowUpIcon : ArrowDownIcon;
  const trendColor =
    trend === "up"
      ? "var(--mui-palette-success-main)"
      : "var(--mui-palette-error-main)";

  return (
    <Card sx={sx}>
      <CardActionArea sx={sx} onClick={handleViewOrders}>
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.primary" variant="h5">
                  Upcoming Order
                </Typography>
                <Typography variant="h4">{value}</Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: "var(--mui-palette-secondary-main)",
                  height: "56px",
                  width: "56px",
                }}
              >
                <CalendarCheckIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
            </Stack>
            {diff ? (
              <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
                <Stack
                  sx={{ alignItems: "center" }}
                  direction="row"
                  spacing={0.5}
                >
                  <TrendIcon
                    color={trendColor}
                    fontSize="var(--icon-fontSize-md)"
                  />
                  <Typography color={trendColor} variant="body2">
                    {diff}%
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="caption">
                  Since last month
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
