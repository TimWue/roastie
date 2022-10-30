import * as React from "react";
import { FunctionComponent } from "react";
import { DetailValue } from "./DetailValue";
import Grid from "@mui/material/Grid";

export const Details: FunctionComponent = () => {
  return (
    <Grid container rowSpacing={2} xs={12}>
      <DetailValue title={"Temperatur"} unit={"°C"} />
    </Grid>
  );
};
