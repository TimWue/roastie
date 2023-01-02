import * as React from "react";
import { FunctionComponent } from "react";
import { AppBar } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {}

export const TopBar: FunctionComponent<Props> = ({}) => {
  return (
    <AppBar position="static" color="primary" sx={{ height: "100%" }}>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ margin: "auto auto auto 20px" }}
      >
        Roastie
      </Typography>
    </AppBar>
  );
};
