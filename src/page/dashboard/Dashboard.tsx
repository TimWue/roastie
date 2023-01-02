import * as React from "react";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Chart } from "../chart/Chart";
import { Save } from "../saveRoast/Save";
import { DurationValue } from "../details/DurationValue";
import { Controls } from "../controls/Controls";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";

export function Dashboard() {
  const { measurementStatus } = useContext(MeasurementContext);
  const controlHeight = 50;

  return (
    <Grid container flexWrap={"wrap"}>
      <Grid item xs={12} height={`${controlHeight}px`}>
        <Grid container flexWrap={"nowrap"} width={"100%"}>
          <DurationValue status={measurementStatus} />
          <Controls />
        </Grid>
      </Grid>
      <Grid item xs={12} md={9} minHeight={"400px"}>
        <Chart />
      </Grid>
      <Grid item xs={12} md={3} p={"10px"}>
        <Save />
      </Grid>
    </Grid>
  );
}
