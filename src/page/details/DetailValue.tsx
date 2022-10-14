import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Title from "../shared/Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { settingsRepository } from "../../domain/settings/SettingsRepository";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";

interface Props {
  title: string;
  unit: string;
}

export const DetailValue: FunctionComponent<Props> = ({ title, unit }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [value, setValue] = useState<number>();
  const { lastMeasurement } = useContext(MeasurementContext);

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      setSelectedTopic(settings.details.selectedTopic);
    });
  }, []);

  useEffect(() => {
    if (lastMeasurement && lastMeasurement.topicName === selectedTopic) {
      setValue(lastMeasurement.measurement.y);
    }
  }, [lastMeasurement]);

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          px: 1,
          py: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: 110,
          overflow: "hidden",
        }}
      >
        <Title>{title}</Title>
        <Typography component="p" variant="h4">
          {value}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {unit}
        </Typography>
      </Paper>
    </Grid>
  );
};
