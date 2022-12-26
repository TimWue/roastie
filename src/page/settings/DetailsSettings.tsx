import * as React from "react";
import { FunctionComponent } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { InputLabel } from "@mui/material";
import { SelectTopic } from "../shared/SelectTopic";
import { TopicName } from "../../domain/settings/Settings";
import Title from "../shared/Title";

interface Props {
  selectedTopic: string | undefined;
  setSelectedTopic: (selectedTopic: string | undefined) => void;
  topicNames: TopicName[];
}

export const DetailsSettings: FunctionComponent<Props> = ({
  selectedTopic,
  setSelectedTopic,
  topicNames,
}) => {
  return (
    <>
      <Title>Details</Title>
      <Divider />
      <Grid container columnSpacing={"50px"} alignItems={"center"}>
        <Grid item>
          <InputLabel htmlFor="selected">Ausgewählte Topic</InputLabel>
        </Grid>

        <Grid item>
          <SelectTopic
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            topicNames={topicNames}
          />
        </Grid>
      </Grid>
    </>
  );
};
