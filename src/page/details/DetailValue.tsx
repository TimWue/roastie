import * as React from "react";
import { FunctionComponent, useState } from "react";
import Typography from "@mui/material/Typography";
import Title from "../shared/Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Topic } from "../../domain/settings/Settings";
import { Measurement } from "../../domain/roast/Roast";

interface Props {
  title: string;
  unit: string;
}

export const DetailValue: FunctionComponent<Props> = ({ title, unit }) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>();
  const [value, setValue] = useState<number>();
  const [host, setHost] = useState<string>();

  const messageHandler = (topicName: string, message: Measurement) => {
    if (selectedTopic && topicName === selectedTopic.name) {
      const value = message.y;
      setValue(value);
    }
  };

  /*useEffect(() => {
      settingsRepository.getSettings().then((settings) => {
        setHost(settings.mqtt.host);
        const topics = settings.mqtt.topics;
        const selectedTopicName = settings.details.selectedTopic;
        const selectedTopic = topics.find(
          (topic) => topic.name == selectedTopicName
        );
  
        if (selectedTopic) {
          setSelectedTopic(selectedTopic);
        } else {
          console.error("Topic [" + selectedTopicName + "] not found.");
        }
      });
    }, []);
  
    useEffect(() => {
      if (host && selectedTopic) {
        const mqtt = new MqttClientConnection(host);
        mqtt.subscribe(selectedTopic.name, messageHandler);
      }
    }, [selectedTopic, host]);*/

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
