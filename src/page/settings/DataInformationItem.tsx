import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import Grid from "@mui/material/Grid";
import { Button, Checkbox, Input, InputLabel, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataInformation, TopicName } from "../../domain/settings/Settings";
import Box from "@mui/material/Box";
import { SelectTopic } from "../shared/SelectTopic";

interface Props {
  dataInformation: DataInformation;
  updateDisplayName: (name: string) => void;
  updateTopicName: (name: string) => void;
  updateShow: (show: boolean) => void;
  updateColor: (color: string) => void;
  deleteDataInformation: () => void;
  topicNames: TopicName[];
}

export const DataInformationItem: FunctionComponent<Props> = ({
  dataInformation,
  updateDisplayName,
  updateColor,
  deleteDataInformation,
  topicNames,
  updateTopicName,
  updateShow,
}) => {
  const changeTopicName = (newTopicName: string | undefined) => {
    if (!newTopicName) {
      throw new Error("Name of Topic must not be null.");
    }
    updateTopicName(newTopicName);
  };
  return (
    <Grid
      container
      direction={"column"}
      p={"5px"}
      style={{
        borderRadius: "10px",
        backgroundColor: "rgb(230,230,230)",
        width: "220px",
      }}
      position={"relative"}
    >
      <Grid
        item
        position={"absolute"}
        top={0}
        right={0}
        sx={{
          transform: "translate(20%,-20%)",
          borderRadius: "10px",
          backgroundColor: "white",
          padding: "0",
        }}
      >
        <Tooltip title={"Löschen"}>
          <Button
            onClick={deleteDataInformation}
            style={{
              padding: "3px",
              width: "30px",
              minWidth: "unset",
              borderRadius: "10px",
            }}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      </Grid>
      <InputFrame>
        <InputLabel>Name:</InputLabel>

        <Input
          placeholder={"Name"}
          value={dataInformation.displayName}
          onChange={(event) => {
            updateDisplayName(event.currentTarget.value);
          }}
          style={{ width: "120px" }}
        />
      </InputFrame>
      <InputFrame>
        <InputLabel>Farbe:</InputLabel>

        <Grid container direction={"row"} width={"120px"}>
          <Input
            placeholder={"Farbe"}
            value={dataInformation.color}
            onChange={(event) => {
              updateColor(event.currentTarget.value);
            }}
            endAdornment={
              <Tooltip title={"Farbe"}>
                <Button disabled>
                  <Box
                    sx={{
                      width: 25,
                      height: 25,
                      backgroundColor: dataInformation.color,
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
      </InputFrame>
      <InputFrame>
        <InputLabel>Topic:</InputLabel>
        <SelectTopic
          selectedTopic={dataInformation.topicName}
          setSelectedTopic={changeTopicName}
          topicNames={topicNames}
        />
      </InputFrame>

      <InputFrame>
        <InputLabel>Anzeigen:</InputLabel>
        <Checkbox
          checked={dataInformation.show}
          onChange={() => updateShow(!dataInformation.show)}
        />
      </InputFrame>
    </Grid>
  );
};

const InputFrame: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Grid
      item
      p={"5px"}
      flexDirection={"row"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {children}
    </Grid>
  );
};
