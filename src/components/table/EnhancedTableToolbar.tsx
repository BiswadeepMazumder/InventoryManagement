import React from "react";
import { Toolbar, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const iconMap: { [key: string]: React.ElementType } = {
  delete: DeleteIcon,
  add: ControlPointIcon,
};

interface EnhancedTableToolbarProps {
  title?: string;
  numSelected: number;
  iconName: string;
  onClick: () => void;
}

const EnhancedTableToolbar = ({
  title,
  numSelected,
  iconName,
  onClick,
}: EnhancedTableToolbarProps) => {
  const IconComponent = iconMap[iconName];

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          backgroundColor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title={iconName.toUpperCase()}>
          <IconButton onClick={onClick}>
            <IconComponent />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
