import * as React from "react";
import { FunctionComponent } from "react";
import { TopicName } from "../../domain/settings/Settings";
import { TopicNameItem } from "./TopicItem";
import Grid from "@mui/material/Grid";

interface Props {
  topicNames: TopicName[];
  setTopicNames: (topicNames: TopicName[]) => void;
}

export const TopicNameList: FunctionComponent<Props> = ({
  topicNames,
  setTopicNames,
}) => {
  const deleteTopic = (index: number) => {
    const newTopicNames = topicNames.filter((topicName, idx) => idx !== index);
    setTopicNames(newTopicNames);
  };

  const updateTopicName = (newTopicName: TopicName, index: number) => {
    const newTopicNames = topicNames.map((oldTopicName, idx) => {
      if (idx === index) {
        return newTopicName;
      }
      return oldTopicName;
    });
    setTopicNames(newTopicNames);
  };

  return (
    <Grid
      container
      direction={"row"}
      flexWrap={"wrap"}
      pl={"50px"}
      gap={"10px"}
      pt={"10px"}
    >
      {topicNames.map((topicName, index) => {
        return (
          <Grid item>
            <TopicNameItem
              topicName={topicName}
              updateTopicName={(name: string) => updateTopicName(name, index)}
              deleteTopic={() => deleteTopic(index)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
