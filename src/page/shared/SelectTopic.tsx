import * as React from "react";
import { FunctionComponent } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Topic } from "../../domain/settings/Settings";

const DEFAULT = "";
interface Props {
  selectedTopic: string | undefined;
  setSelectedTopic: (selectedTopic: string) => void;
  topicNames: string[];
}
export const SelectTopic: FunctionComponent<Props> = ({
  selectedTopic,
  setSelectedTopic,
  topicNames,
}) => {
  const setTopic = (newTopic: string) => {
    if (newTopic !== DEFAULT) {
      setSelectedTopic(newTopic);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="selected-label">Topic</InputLabel>

      <Select
        variant={"standard"}
        labelId="selected-label"
        id="selected"
        value={selectedTopic}
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
