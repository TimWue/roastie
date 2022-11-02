import * as React from "react";
import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Button, InputLabel, Tooltip } from "@mui/material";
import { DataInformation, TopicName } from "../../domain/settings/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataInformationList } from "./DataInformationList";

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
    setDataInformation([
      ...dataInformation,
      { displayName: "", topicName: "", color: "000000" },
    ]);
  };
  return (
    <>
      <Typography component="p" variant="h4">
        Darstellung
      </Typography>
      <Divider />

      <Grid container columnSpacing={"50px"} flexWrap={"wrap"}>
        <Grid item>
          <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
        </Grid>
        <DataInformationList
          dataInformation={dataInformation}
          setDataInformation={setDataInformation}
        />
        <Grid item></Grid>
        <Tooltip title={"Topic hinzufügen"}>
          <Button onClick={addNewDataInformation}>
            <AddCircleIcon />
          </Button>
        </Tooltip>
      </Grid>
    </>
  );
};
