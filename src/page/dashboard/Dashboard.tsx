import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Chart } from "../chart/Chart";
import { SwitchDetailsSave } from "./SwitchDetailsSave";

export function Dashboard() {
  return (
    <Grid container width={"100%"}>
      <Grid item xs={12} sm={12} md={9} width={"100%"}>
        <Paper
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: 420,
            width: "100%",
          }}
          variant={"outlined"}
        >
          <Chart />
        </Paper>
      </Grid>
      <Grid xs={12} sm={12} md={3}>
        <SwitchDetailsSave />
      </Grid>
    </Grid>
  );
}
