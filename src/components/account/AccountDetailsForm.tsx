"use client";

import React from "react";
// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
// import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid2";

const states = [
  { value: "alabama", label: "Alabama" },
  { value: "new-york", label: "New York" },
  { value: "san-francisco", label: "San Francisco" },
  { value: "los-angeles", label: "Los Angeles" },
] as const;

type AccountDetailsFormProps = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export function AccountDetailsForm({
  firstName,
  lastName,
  email,
}: AccountDetailsFormProps): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader
          title="Profile"
          subheader="The information can't be edited. Please contact the admin to make any changes."
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ md: 6, xs: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput
                  defaultValue=""
                  label="First name"
                  name="firstName"
                  value={firstName}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid size={{ md: 6, xs: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput
                  defaultValue=""
                  label="Last name"
                  name="lastName"
                  value={lastName}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid size={{ md: 6, xs: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  defaultValue=""
                  label="Email address"
                  name="email"
                  value={email}
                  disabled
                />
              </FormControl>
            </Grid>

            {/*<Grid size={{ md: 6, xs: 12 }}>*/}
            {/*  <FormControl fullWidth>*/}
            {/*    <InputLabel>Phone number</InputLabel>*/}
            {/*    <OutlinedInput label="Phone number" name="phone" type="tel" />*/}
            {/*  </FormControl>*/}
            {/*</Grid>*/}

            {/*<Grid size={{ md: 6, xs: 12 }}>*/}
            {/*  <FormControl fullWidth>*/}
            {/*    <InputLabel>State</InputLabel>*/}
            {/*    <Select*/}
            {/*      defaultValue="New York"*/}
            {/*      label="State"*/}
            {/*      name="state"*/}
            {/*      variant="outlined"*/}
            {/*    >*/}
            {/*      {states.map((option) => (*/}
            {/*        <MenuItem key={option.value} value={option.value}>*/}
            {/*          {option.label}*/}
            {/*        </MenuItem>*/}
            {/*      ))}*/}
            {/*    </Select>*/}
            {/*  </FormControl>*/}
            {/*</Grid>*/}

            {/*<Grid size={{ md: 6, xs: 12 }}>*/}
            {/*  <FormControl fullWidth>*/}
            {/*    <InputLabel>City</InputLabel>*/}
            {/*    <OutlinedInput label="City" />*/}
            {/*  </FormControl>*/}
            {/*</Grid>*/}
          </Grid>
        </CardContent>
        <Divider />
        {/*<CardActions sx={{ justifyContent: "flex-end" }}>*/}
        {/*  <Button variant="contained">Save details</Button>*/}
        {/*</CardActions>*/}
      </Card>
    </form>
  );
}
