import * as React from "react";
import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid";
import { Button, Input, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TopicName } from "../../domain/settings/Settings";

interface Props {
  topicName: TopicName;
  updateTopicName: (name: string) => void;
  deleteTopic: () => void;
}

export const TopicNameItem: FunctionComponent<Props> = ({
  topicName,
  updateTopicName,
  deleteTopic,
}) => {
  return (
    <Grid
      container
      direction={"column"}
      p={"5px"}
      style={{ borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.075)" }}
    >
      <Grid item p={"5px"}>
        <Input
          fullWidth
          endAdornment={
            <Tooltip title={"Löschen"}>
              <Button onClick={deleteTopic}>
                <DeleteIcon />
              </Button>
            </Tooltip>
          }
          value={topicName}
          onChange={(event) => {
            updateTopicName(event.currentTarget.value);
          }}
        />
      </Grid>
    </Grid>
  );
};
