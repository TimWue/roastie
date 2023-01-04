import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { DetailValue } from "./DetailValue";
import Grid from "@mui/material/Grid";
import { settingsRepository } from "../../domain/settings/SettingsRepository";
import { TopicName } from "../../domain/settings/Settings";

export const Details: FunctionComponent = () => {
  const [topicNames, setTopicNames] = useState<TopicName[]>([]);

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      setTopicNames(
        settings.display.dataInformation
          .filter((dataInformation) => dataInformation.show)
          .map((dataInformation) => dataInformation.topicName)
      );
    });
  }, []);

  return (
    <Grid item flexGrow={1}>
      <Grid
        container
        flexDirection={"row"}
        justifyContent={"center"}
        gap={"10px"}
      >
        {topicNames.map((topicName) => {
          return <DetailValue topicName={topicName} key={topicName} />;
        })}
      </Grid>
    </Grid>
  );
};
