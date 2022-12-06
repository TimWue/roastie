import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { DetailValue } from "./DetailValue";
import Grid from "@mui/material/Grid";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";

export const Details: FunctionComponent = () => {
  const [lastValues, setLastValues] = useState(new Map<string, number>());
  const { lastMeasurement } = useContext(MeasurementContext);

  useEffect(() => {
    lastMeasurement?.measurement &&
      lastMeasurement?.topicName &&
      setLastValues(
        new Map(
          lastValues.set(
            lastMeasurement?.topicName,
            lastMeasurement?.measurement.y
          )
        )
      );
  }, [lastMeasurement]);

  return (
    <Grid
      container
      rowSpacing={2}
      xs={12}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
    >
      {Array.from(lastValues.keys()).map((key) => {
        const value = lastValues.get(key);
        if (!value) return <></>;
        return (
          <DetailValue
            title={"Temperatur"}
            unit={"°C"}
            value={value}
            displayName={key}
          />
        );
      })}
    </Grid>
  );
};
