import * as React from "react";
import { ChangeEvent, FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Button, Input, InputLabel, Tooltip } from "@mui/material";
import { Topic } from "../../domain/settings/Settings";
import { TopicList } from "./TopicList";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  host: string;
  setHost: (host: string) => void;

  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
}

export const MqttSettings: FunctionComponent<Props> = ({
  host,
  setHost,
  topics,
  setTopics,
}) => {
  const handleHostChange = (event: ChangeEvent<any>) => {
    setHost(event.currentTarget.value);
  };

  const addNewTopic = () => {
    setTopics([...topics, { name: "", color: "#000000" }]);
  };

  return (
    <>
      <Typography component="p" variant="h4">
        MQTT
      </Typography>
      <Divider />
      <Grid container columnSpacing={"50px"} alignItems={"center"}>
        <Grid item>
          <InputLabel htmlFor="outlined-adornment-amount">Host</InputLabel>
        </Grid>
        <Grid item>
          <Input value={host} onChange={handleHostChange} />
        </Grid>
      </Grid>

      <Grid container columnSpacing={"50px"} flexWrap={"wrap"}>
        <Grid item>
          <InputLabel htmlFor="outlined-adornment-amount">Topics</InputLabel>
        </Grid>
        <TopicList topics={topics} setTopics={setTopics} />
        <Grid item></Grid>
        <Tooltip title={"Topic hinzufügen"}>
          <Button onClick={addNewTopic}>
            <AddCircleIcon />
          </Button>
        </Tooltip>
      </Grid>
    </>
  );
};
