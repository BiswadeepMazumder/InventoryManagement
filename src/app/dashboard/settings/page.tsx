"use client";

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// import { Theme } from "@/components/dashboard/settings/Theme";
// import { Notifications } from "@/components/dashboard/settings/notifications";
import { UpdatePasswordForm } from "@/components/settings/UpdatePasswordForm";
import { authClient } from "@/utils/client";

export default function Page(): React.JSX.Element {
  const { changePassword } = authClient;

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    const { error } = await changePassword({ currentPassword, newPassword });

    if (error) {
      console.error("[DEBUG] Error changing password:", error);
      toast.error(error);
      return;
    }

    console.log("[DEBUG] Password changed successfully");
    toast.success("Password changed successfully");
  };

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Settings</Typography>
      </div>
      {/*<Theme />*/}
      {/*<Notifications />*/}
      <UpdatePasswordForm onChangePassword={handleChangePassword} />
      <ToastContainer />
    </Stack>
  );
}
