import * as React from "react";
import { ChangeEvent, FunctionComponent } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Button, Input, InputLabel, Tooltip } from "@mui/material";
import { TopicName } from "../../domain/settings/Settings";
import { TopicNameList } from "./TopicNameList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Title from "../shared/Title";

interface Props {
  host: string;
  setHost: (host: string) => void;

  topicsNames: TopicName[];
  setTopicNames: (topics: TopicName[]) => void;
}

export const MqttSettings: FunctionComponent<Props> = ({
  host,
  setHost,
  topicsNames,
  setTopicNames,
}) => {
  const handleHostChange = (event: ChangeEvent<any>) => {
    setHost(event.currentTarget.value);
  };

  const addNewTopic = () => {
    setTopicNames([...topicsNames, ""]);
  };

  return (
    <>
      <Title>MQTT</Title>
      <Divider />
      <Grid container columnSpacing={"50px"} alignItems={"center"}>
        <Grid item>
          <InputLabel htmlFor="outlined-adornment-amount">Host</InputLabel>
        </Grid>
        <Grid item>
          <Input value={host} onChange={handleHostChange} />
        </Grid>
      </Grid>

      <Grid container gap={"10px"}>
        <InputLabel htmlFor="outlined-adornment-amount">Topics</InputLabel>
        <Grid
          container
          gap={"10px"}
          flexWrap={"wrap"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <TopicNameList
            topicNames={topicsNames}
            setTopicNames={setTopicNames}
          />
          <Grid item>
            <Tooltip title={"Topic hinzufügen"}>
              <Button onClick={addNewTopic}>
                <AddCircleIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
