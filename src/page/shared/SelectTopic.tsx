import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Topic } from "../../domain/settings/Settings";

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
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="selected-label">Topic</InputLabel>

      <Select
        variant={"standard"}
        labelId="selected-label"
        id="selected"
        value={selectedTopicValue}
        label={"Topic"}
        onChange={(event) => setTopic(event.target.value)}
      >
        <MenuItem value={DEFAULT}>
          <em>Keine</em>
        </MenuItem>
        {topicNames.map((topic) => {
          return <MenuItem value={topic}>{topic}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};
