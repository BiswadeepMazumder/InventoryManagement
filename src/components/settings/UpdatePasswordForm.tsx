import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";

type UpdatePasswordFormProps = {
  onChangePassword: (currentPassword: string, newPassword: string) => void;
};

export function UpdatePasswordForm({
  onChangePassword,
}: UpdatePasswordFormProps): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;

        onChangePassword(currentPassword, newPassword);

        // Clear form fields after submission
        event.currentTarget.reset();
      }}
    >
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: "sm" }}>
            <FormControl fullWidth>
              <InputLabel>Current Password</InputLabel>
              <OutlinedInput
                label="Current Password"
                name="currentPassword"
                type="password"
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                label="New Password"
                name="newPassword"
                type="password"
              />
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
