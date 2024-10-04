"use client";

import * as React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useColorScheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";

export function Theme(): React.JSX.Element {
  const { mode, setMode } = useColorScheme();
  console.log("mode", mode);

  const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return;
    }

    setMode(event.target.value as "system" | "light" | "dark");
  };

  return (
    <Card>
      <CardHeader subheader="Manage the theme" title="Theme" />
      <Divider />
      <CardContent>
        <FormControl>
          <RadioGroup
            name="theme-toggle"
            row
            value={mode}
            onChange={handleChangeTheme}
          >
            <FormControlLabel
              value="system"
              control={<Radio />}
              label="System"
            />
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}
