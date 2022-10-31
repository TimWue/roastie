import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Chart } from "../chart/Chart";
import { SwitchDetailsSave } from "./SwitchDetailsSave";

export function Dashboard() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={9}>
          <Paper
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              height: 420,
              width: "100%",
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        <Grid xs={12} sm={12} md={3}>
          <SwitchDetailsSave />
        </Grid>
      </Grid>
    </Container>
  );
}
