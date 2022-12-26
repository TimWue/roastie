import * as React from "react";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Chart } from "../chart/Chart";
import { Save } from "../saveRoast/Save";
import { toolbarHeight } from "../content-frame/TopBar";
import { DurationValue } from "../details/DurationValue";
import { Controls } from "../controls/Controls";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";

export function Dashboard() {
  const { measurementStatus } = useContext(MeasurementContext);

  const controlHeight = 50;
  const heightAll = window.innerHeight - toolbarHeight;
  const heightChart = heightAll - controlHeight;

  return (
    <>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"nowrap"}
        height={`${controlHeight}px`}
        sx={{ backgroundColor: "rgba(0,0,0,0.075)" }}
        p={"5px"}
      >
        <DurationValue status={measurementStatus} />
        <Controls />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={9}
        width={"100%"}
        height={`${heightChart}px`}
        overflow={"hidden"}
      >
        <Chart />
      </Grid>
      <Grid item xs={12} sm={12} md={3} p={"10px"}>
        <Save />
      </Grid>
    </>
  );
}
