import * as React from "react";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { settingsRepository } from "../../domain/settings/SettingsRepository";
import { Settings } from "../../domain/settings/Settings";

export const SettingsManagement: FunctionComponent = ({}) => {
  const [host, setHost] = useState("mqtt://test.mosquitto.org");
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const handleHostChange = (event: ChangeEvent<any>) => {
    setHost(event.currentTarget.value);
  };

  const deleteTopic = (index: number) => {
    const newTopics = topics.filter((topic, idx) => idx !== index);
    setTopics(newTopics);
  };

  const updateTopic = (topicName: string, index: number) => {
    const newTopics = topics.map((topic, idx) => {
      if (idx === index) {
        topic = topicName;
      }
      return topic;
    });
    setTopics(newTopics);
  };

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={1} p={"10px"}>
        <Grid item xs={12}>
          <Paper
            style={{
              padding: "50px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography component="p" variant="h4">
              MQTT
            </Typography>
            <Divider />
            <Grid container columnSpacing={"50px"} alignItems={"center"}>
              <Grid item>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Host
                </InputLabel>
              </Grid>
              <Grid item>
                <Input value={host} onChange={handleHostChange} />
              </Grid>
            </Grid>

            <Grid
              container
              columnSpacing={"50px"}
              alignItems={"center"}
              flexWrap={"nowrap"}
            >
              <Grid item>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Topics
                </InputLabel>
              </Grid>
              {topics.map((topic, index) => {
                return (
                  <Grid item>
                    <Input
                      endAdornment={
                        <Tooltip title={"Löschen"}>
                          <Button onClick={() => deleteTopic(index)}>
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      }
                      value={topic}
                      onChange={(event) => {
                        updateTopic(event.currentTarget.value, index);
                      }}
                    />
                  </Grid>
                );
              })}
              <Grid item></Grid>
              <Tooltip title={"Topic hinzufügen"}>
                <Button
                  onClick={() => {
                    setTopics([...topics, ""]);
                  }}
                >
                  <AddCircleIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            style={{
              padding: "50px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography component="p" variant="h4">
              Details
            </Typography>
            <Divider />
            <Grid container columnSpacing={"50px"} alignItems={"center"}>
              <Grid item>
                <InputLabel htmlFor="selected">Ausgewählte Topic</InputLabel>
              </Grid>

              <Grid item>
                <Select
                  variant={"standard"}
                  labelId="selected"
                  id="selected"
                  value={selectedTopic}
                >
                  <MenuItem value="">
                    <em>Keine</em>
                  </MenuItem>
                  {topics.map((topic) => {
                    return (
                      <MenuItem
                        value={topic}
                        onClick={() => setSelectedTopic(topic)}
                      >
                        {topic}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Button
            style={{ marginLeft: "auto", display: "block" }}
            onClick={saveSettings}
          >
            Speichern
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
