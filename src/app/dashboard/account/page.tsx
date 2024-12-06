"use client";

import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import { AccountDetailsForm } from "@/components/account/AccountDetailsForm";
import { AccountInfo } from "@/components/account/AccountInfo";
import { useUser } from "@/hooks/useUser";
import { NAME_DELIMITER } from "@/utils/client";

export default function Page(): React.JSX.Element {
  const { user, isLoading } = useUser();
  const displayName = (user?.displayName || "") as string;
  const [firstName, lastName] = displayName.split(NAME_DELIMITER);

  const email = user?.email || "";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AccountInfo firstName={firstName} lastName={lastName} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AccountDetailsForm
            firstName={firstName}
            lastName={lastName}
            email={email}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
