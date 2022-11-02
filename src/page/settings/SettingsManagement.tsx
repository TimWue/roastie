import * as React from "react";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { settingsRepository } from "../../domain/settings/SettingsRepository";
import {
  DataInformation,
  Settings,
  TopicName,
} from "../../domain/settings/Settings";
import { DetailsSettings } from "./DetailsSettings";
import { MqttSettings } from "./MqttSettings";
import { DisplaySettings } from "./DisplaySettings";

export const SettingsManagement: FunctionComponent = ({}) => {
  const [host, setHost] = useState("ws://localhost:8000");
  const [dataInformation, setDataInformation] = useState<DataInformation[]>([]);
  const [topicNames, setTopicNames] = useState<TopicName[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicName>();

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      if (settings) {
        setTopicNames(settings.mqtt.topicNames ?? []);
        setHost(settings.mqtt.host);
        setSelectedTopic(settings.details.selectedTopic);
        setDataInformation(settings.display.dataInformation);
      }
    });
  }, []);

  const saveSettings = async () => {
    if (!selectedTopic) {
      throw new Error("Please select a topic for details");
    }

    console.log(dataInformation.map((data) => data.show));
    const newSettings: Settings = {
      mqtt: { host, topicNames: topicNames },
      id: 1,
      details: { selectedTopic },
      display: { dataInformation: dataInformation },
    };
    await settingsRepository.updateSettings(newSettings);
  };

  return (
    <Grid container spacing={1} p={"10px"}>
      <SettingsFrame>
        <MqttSettings
          host={host}
          setHost={setHost}
          topicsNames={topicNames}
          setTopicNames={setTopicNames}
        />
      </SettingsFrame>

      <SettingsFrame>
        <DisplaySettings
          topicNames={topicNames}
          dataInformation={dataInformation}
          setDataInformation={setDataInformation}
        />
      </SettingsFrame>

      <SettingsFrame>
        <DetailsSettings
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          topicNames={topicNames}
        />
      </SettingsFrame>

      <Grid item xs={12}>
        <Button
          style={{
            marginTop: "20px",
            marginLeft: "auto",
            display: "block",
            marginRight: "auto",
          }}
          onClick={saveSettings}
        >
          Speichern
        </Button>
      </Grid>
    </Grid>
  );
};

const SettingsFrame: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Grid item xs={12}>
      <Paper
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        variant={"outlined"}
      >
        {" "}
        {children}
      </Paper>
    </Grid>
  );
};
