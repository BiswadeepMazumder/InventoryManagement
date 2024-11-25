import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const STORE_NAME = process.env.NEXT_PUBLIC_STORE_NAME || process.env.STORE_NAME;

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: "flex", lg: "grid" },
        flexDirection: "column",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100%",
      }}
    >
      <Box sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flex: "1 1 auto",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: "450px", width: "100%" }}>{children}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          background: "#3725ae",
          color: "var(--mui-palette-common-white)",
          display: { xs: "none", lg: "flex" },
          justifyContent: "center",
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography
              color="inherit"
              sx={{
                fontSize: "24px",
                lineHeight: "32px",
                textAlign: "center",
              }}
              variant="h1"
            >
              Welcome to {""}
              <Box component="span" sx={{ color: "#c5caff" }}>
                {STORE_NAME}
              </Box>
            </Typography>

            <Typography align="center" variant="subtitle1">
              Powered by Professional Inventory Management Software
            </Typography>
          </Stack>
          {/*<Box sx={{ display: "flex", justifyContent: "center" }}>*/}
          {/*  <Box*/}
          {/*    component="img"*/}
          {/*    alt="Widgets"*/}
          {/*    src="/assets/auth-widgets.png"*/}
          {/*    sx={{ height: "auto", width: "100%", maxWidth: "600px" }}*/}
          {/*  />*/}
          {/*</Box>*/}
        </Stack>
      </Box>
    </Box>
  );
}
