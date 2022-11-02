import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";

const DEFAULT = "---";
interface Props {
  selectedTopic: string | undefined;
  setSelectedTopic: (selectedTopic: string | undefined) => void;
  topicNames: string[];
}
export const SelectTopic: FunctionComponent<Props> = ({
  selectedTopic,
  setSelectedTopic,
  topicNames,
}) => {
  const [selectedTopicValue, setSelectedTopicValue] = useState(DEFAULT);
  const setTopic = (newTopic: string) => {
    setSelectedTopic(newTopic === DEFAULT ? undefined : newTopic);
  };

  useEffect(() => {
    setSelectedTopicValue(selectedTopic ?? DEFAULT);
  }, [selectedTopic]);

  return (
    <Select
      variant={"standard"}
      id="selected"
      value={selectedTopicValue}
      onChange={(event) => setTopic(event.target.value)}
      displayEmpty
      style={{ width: "120px" }}
    >
      {topicNames.map((topic) => {
        return <MenuItem value={topic}>{topic}</MenuItem>;
      })}
    </Select>
  );
};
