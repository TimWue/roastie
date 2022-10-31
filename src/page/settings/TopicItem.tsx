import * as React from "react";
import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid";
import { Button, Input, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Topic } from "../../domain/settings/Settings";
import Box from "@mui/material/Box";

interface Props {
  topic: Topic;
  updateTopicName: (name: string) => void;
  updateTopicColor: (color: string) => void;
  deleteTopic: () => void;
}

export const TopicItem: FunctionComponent<Props> = ({
  topic,
  updateTopicColor,
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
          value={topic.name}
          onChange={(event) => {
            updateTopicName(event.currentTarget.value);
          }}
        />
      </Grid>
      <Grid item p={"5px"}>
        <Grid container direction={"row"} width={"100%"}>
          <Input
            fullWidth
            value={topic.color}
            onChange={(event) => {
              updateTopicColor(event.currentTarget.value);
            }}
            endAdornment={
              <Tooltip title={"Farbe"}>
                <Button disabled>
                  <Box
                    sx={{
                      width: 25,
                      height: 25,
                      backgroundColor: topic.color,
                      borderRadius: "10%",
                      borderWidth: "2px",
                      borderColor: "black",
                      borderStyle: "solid",
                    }}
                  />
                </Button>
              </Tooltip>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
