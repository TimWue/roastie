import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { DetailValue } from "./DetailValue";
import Grid from "@mui/material/Grid";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { Button } from "@mui/material";
import { settingsRepository } from "../../domain/settings/SettingsRepository";

export const Details: FunctionComponent = () => {
  const { startMeasurement, stopMeasurement } = useContext(MeasurementContext);
  const [topicNames, setTopicNames] = useState<string[]>();
  const [host, setHost] = useState<string>();

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      setHost(settings.mqtt.host);
      setTopicNames(settings.mqtt.topics.map((topic) => topic.name));
    });
  }, []);

  return (
    <Grid container rowSpacing={2} xs={12}>
      <DetailValue title={"Temperatur"} unit={"°C"} />
      <DetailValue title={"Gradient"} unit={"°C/min"} />
      {host && topicNames && (
        <>
          <Button onClick={() => startMeasurement(host, topicNames)}>
            Start
          </Button>
          <Button onClick={() => stopMeasurement(topicNames)}>Stop</Button>
        </>
      )}
    </Grid>
  );
};
