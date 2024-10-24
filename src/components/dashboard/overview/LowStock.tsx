import * as React from "react";
import { useRouter } from "next/navigation";

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import type { SxProps } from "@mui/material/styles";

import { ListBullets as ListBulletsIcon } from "@phosphor-icons/react/dist/ssr/ListBullets";

export interface TasksProgressProps {
  sx?: SxProps;
  name: string;
  value: number;
}

export function LowStock({
  name,
  value,
  sx,
}: TasksProgressProps): React.JSX.Element {
  const router = useRouter();

  const handleViewItems = () => {
    router.push("dashboard/items");
  };

  return (
    <Card sx={sx}>
      <CardActionArea sx={sx} onClick={handleViewItems}>
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="overline"
                >
                  Low Stock
                </Typography>
                <Typography variant="h4">
                  {name}: {value}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: "var(--mui-palette-warning-main)",
                  height: "56px",
                  width: "56px",
                }}
              >
                <ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
            </Stack>
            <div>
              <LinearProgress value={value} variant="determinate" />
            </div>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
