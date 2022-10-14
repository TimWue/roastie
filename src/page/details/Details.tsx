import * as React from "react";
import { FunctionComponent, useContext, useEffect } from "react";
import { DetailValue } from "./DetailValue";
import Grid from "@mui/material/Grid";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { Button } from "@mui/material";

export const Details: FunctionComponent = () => {
  const { startMeasurement, stopMeasurement } = useContext(MeasurementContext);

  useEffect(() => {
    startMeasurement();
  }, []);

  return (
    <Grid container rowSpacing={2} xs={12}>
      <DetailValue title={"Temperatur"} unit={"°C"} />
      <DetailValue title={"Gradient"} unit={"°C/min"} />

      <Button onClick={startMeasurement}>Start</Button>
      <Button onClick={stopMeasurement}>Stop</Button>
    </Grid>
  );
};
