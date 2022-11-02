import * as React from "react";
import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { InputLabel } from "@mui/material";
import { SelectTopic } from "../shared/SelectTopic";
import { Topic } from "../../domain/settings/Settings";

interface Props {
  selectedTopic: string | undefined;
  setSelectedTopic: (selectedTopic: string | undefined) => void;
  topics: Topic[];
}

export const DetailsSettings: FunctionComponent<Props> = ({
  selectedTopic,
  setSelectedTopic,
  topics,
}) => {
  return (
    <>
      <Typography component="p" variant="h4">
        Details
      </Typography>
      <Divider />
      <Grid container columnSpacing={"50px"} alignItems={"center"}>
        <Grid item>
          <InputLabel htmlFor="selected">Ausgewählte Topic</InputLabel>
        </Grid>

        <Grid item>
          <SelectTopic
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            topicNames={topics.map((topic) => topic.name)}
          />
        </Grid>
      </Grid>
    </>
  );
};
