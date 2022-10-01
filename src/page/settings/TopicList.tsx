import * as React from "react";
import { FunctionComponent } from "react";
import { Topic } from "../../domain/settings/Settings";
import { TopicItem } from "./TopicItem";
import Grid from "@mui/material/Grid";

interface Props {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
}

export const TopicList: FunctionComponent<Props> = ({ topics, setTopics }) => {
  const deleteTopic = (index: number) => {
    const newTopics = topics.filter((topic, idx) => idx !== index);
    setTopics(newTopics);
  };

  const updateTopicName = (topicName: string, index: number) => {
    const newTopics = topics.map((topic, idx) => {
      if (idx === index) {
        topic.name = topicName;
      }
      return topic;
    });
    setTopics(newTopics);
  };

  const updateTopicColor = (topicColor: string, index: number) => {
    const newTopics = topics.map((topic, idx) => {
      if (idx === index) {
        topic.color = topicColor;
      }
      return topic;
    });
    setTopics(newTopics);
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
      {topics.map((topic, index) => {
        return (
          <Grid item>
            <TopicItem
              topic={topic}
              updateTopicName={(name: string) => updateTopicName(name, index)}
              updateTopicColor={(color: string) =>
                updateTopicColor(color, index)
              }
              deleteTopic={() => deleteTopic(index)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
