import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { settingsRepository } from "../../domain/settings/SettingsRepository";
import { Settings, Topic } from "../../domain/settings/Settings";
import { DetailsSettings } from "./DetailsSettings";
import { MqttSettings } from "./MqttSettings";

export const SettingsManagement: FunctionComponent = ({}) => {
  const [host, setHost] = useState("mqtt://test.mosquitto.org");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>();

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      if (settings) {
        setTopics(settings.mqtt.topics);
        setHost(settings.mqtt.host);
        setSelectedTopic(settings.details.selectedTopic);
      }
    });
  }, []);

  const saveSettings = async () => {
    if (!selectedTopic) {
      throw new Error("Please select a topic for details");
    }

    const newSettings: Settings = {
      mqtt: { host, topics },
      id: 1,
      details: { selectedTopic },
    };
    await settingsRepository.updateSettings(newSettings);
  };

  return (
    <Grid container spacing={1} p={"10px"}>
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
          <MqttSettings
            host={host}
            setHost={setHost}
            topics={topics}
            setTopics={setTopics}
          />
        </Paper>
      </Grid>

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
          <DetailsSettings
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            topics={topics}
          />
        </Paper>
      </Grid>

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
