import * as React from "react";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Chart } from "../chart/Chart";
import { Save } from "../saveRoast/Save";
import { DurationValue } from "../details/DurationValue";
import { Controls } from "../controls/Controls";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { Details } from "../details/Details";

export function Dashboard() {
  const { measurementStatus } = useContext(MeasurementContext);

  return (
    <Grid container flexWrap={"wrap"}>
      <Grid item xs={12}>
        <Grid
          container
          width={"100%"}
          alignItems={"center"}
          pt={"5px"}
          pb={"5px"}
          flexDirection={"row"}
          flexWrap={"nowrap"}
          justifyContent={"space-between"}
        >
          <DurationValue status={measurementStatus} />
          <Details />
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
