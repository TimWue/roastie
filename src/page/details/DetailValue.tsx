import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Measurement } from "../../domain/roast/Roast";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { settingsRepository } from "../../domain/settings/SettingsRepository";

interface Props {
  topicName: string;
}
const secToMinFactor = 1 / 60000;
export const DetailValue: FunctionComponent<Props> = ({ topicName }) => {
  const { currentMeasurement: measurementOfAnyTopic } =
    useContext(MeasurementContext);

  const [currentMeasurement, setCurrentMeasurement] = useState<Measurement>();
  const [gradient, setGradient] = useState<number>();
  const [color, setColor] = useState<string>();
  const [displayName, setDisplayName] = useState<string>();

  const calcGradient = (
    oldMeasurement: Measurement,
    newMeasurement: Measurement
  ): number => {
    const xDiffMinutes = (newMeasurement.x - oldMeasurement.x) * secToMinFactor;
    const yDiff = newMeasurement.y - oldMeasurement.y;
    return yDiff / xDiffMinutes;
  };

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      const dataInformation = settings.display.dataInformation.find(
        (dataInformation) => dataInformation.topicName === topicName
      );
      setColor(dataInformation!.color);
      setDisplayName(dataInformation!.displayName);
    });
  }, []);

  useEffect(() => {
    if (
      measurementOfAnyTopic &&
      measurementOfAnyTopic.topicName === topicName
    ) {
      if (currentMeasurement) {
        setGradient(
          Math.round(
            calcGradient(currentMeasurement, measurementOfAnyTopic.measurement)
          )
        );
      }
      setCurrentMeasurement(measurementOfAnyTopic.measurement);
      console.log(measurementOfAnyTopic.topicName +":" + measurementOfAnyTopic.measurement.y )
    }
  }, [measurementOfAnyTopic]);

  const renderValue = (value: number | undefined, unit: string) => {
    console.log("rendering:" + topicName)
    return (
      <Grid item flexDirection={"row"} flexWrap={"nowrap"} display={"flex"}>
        <Typography component="p" variant="h6">
          {value ?? "--"}
        </Typography>

        <Typography
          component="p"
          variant="h6"
          color={"darkgray"}
          fontSize={"14px"}
        >
          {unit}
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid item>
      <Grid
        container
        p={"8px"}
        borderRadius={"4px"}
        flexDirection={"column"}
        columnGap={"10px"}
        alignItems={"start"}
        justifyContent={"center"}
        bgcolor={"rgb(240,240,240)"}
        height={"70px"}
        flexWrap={"nowrap"}
        width={"fit-content"}
        m={"5px"}
      >
        <Grid item>
          <Grid item fontWeight={"bold"} color={color}>
            {displayName}
          </Grid>
        </Grid>

        <Grid item>
          <Grid container gap={"4px"} flexDirection={"row"}>
            {renderValue(currentMeasurement?.y, "°C")}
            {renderValue(gradient, "°C/min")}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
