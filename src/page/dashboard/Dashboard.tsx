import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../chart/Chart";
import { ArchiveTable } from "../archive/ArchiveTable";
import { SwitchDetailsSave } from "./SwitchDetailsSave";

export function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={1}>
        {/* Chart */}
        <Grid item xs={9}>
          <Paper
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              height: 420,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        <SwitchDetailsSave />
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
            <ArchiveTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
