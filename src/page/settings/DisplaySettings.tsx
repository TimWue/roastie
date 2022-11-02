import * as React from "react";
import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Button, InputLabel, Tooltip } from "@mui/material";
import { DataInformation, TopicName } from "../../domain/settings/Settings";
import { DataInformationList } from "./DataInformationList";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  topicNames: TopicName[];
  dataInformation: DataInformation[];
  setDataInformation: (topics: DataInformation[]) => void;
}

export const DisplaySettings: FunctionComponent<Props> = ({
  topicNames,
  dataInformation,
  setDataInformation,
}) => {
  const addNewDataInformation = () => {
    if (topicNames.length == 0) {
      throw new Error("Can not create data information without topics.");
    }
    setDataInformation([
      ...dataInformation,
      {
        displayName: "",
        topicName: topicNames[0],
        color: "#111111",
        show: false,
      },
    ]);
  };

  return (
    <>
      <Typography component="p" variant="h4">
        Darstellung
      </Typography>
      <Divider />
      <Grid item>
        <InputLabel>Darstellungen</InputLabel>
      </Grid>
      <Grid
        container
        gap={"10px"}
        flexWrap={"wrap"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <DataInformationList
          dataInformation={dataInformation}
          setDataInformation={setDataInformation}
          topicNames={topicNames}
        />
        <Grid item>
          <Tooltip title={"Darstellung hinzufügen"}>
            <Button onClick={addNewDataInformation}>
              <AddCircleIcon />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};
