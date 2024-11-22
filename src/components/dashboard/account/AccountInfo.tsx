import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const user = {
  name: "First Last",
  avatar: "/assets/avatar.png",
  jobTitle: "Job",
  country: "USA",
  city: "Los Angeles",
  timezone: "GTM-7",
} as const;

type AccountInfoProps = {
  firstName?: string;
  lastName?: string;
};

export function AccountInfo({
  firstName,
  lastName,
}: AccountInfoProps): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: "80px", width: "80px" }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">
              {firstName} {lastName}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {/*{user.city} {user.country}*/}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {/*{user.timezone}*/}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      {/*<CardActions>*/}
      {/*  <Button fullWidth variant="text">*/}
      {/*    Upload picture*/}
      {/*  </Button>*/}
      {/*</CardActions>*/}
    </Card>
  );
}
