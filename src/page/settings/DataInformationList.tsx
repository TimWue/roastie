import * as React from "react";
import { FunctionComponent } from "react";
import { DataInformation } from "../../domain/settings/Settings";
import Grid from "@mui/material/Grid";
import { DataInformationItem } from "./DataInformationItem";

interface Props {
  dataInformation: DataInformation[];
  setDataInformation: (dataInformation: DataInformation[]) => void;
}

export const DataInformationList: FunctionComponent<Props> = ({
  dataInformation,
  setDataInformation,
}) => {
  const deleteDataInformation = (index: number) => {
    const newDataInformation = dataInformation.filter(
      (dataInformation, idx) => idx !== index
    );
    setDataInformation(newDataInformation);
  };

  const updateDisplayName = (newName: string, index: number) => {
    const newDataInformation = dataInformation.map((dataInformation, idx) => {
      if (idx === index) {
        dataInformation.displayName = newName;
      }
      return dataInformation;
    });
    setDataInformation(newDataInformation);
  };

  const updateColor = (color: string, index: number) => {
    const newDataInformation = dataInformation.map((dataInformation, idx) => {
      if (idx === index) {
        dataInformation.color = color;
      }
      return dataInformation;
    });
    setDataInformation(newDataInformation);
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
      {dataInformation.map((dataInformation, index) => {
        return (
          <Grid item>
            <DataInformationItem
              dataInformation={dataInformation}
              updateDisplayName={(name: string) =>
                updateDisplayName(name, index)
              }
              updateColor={(color: string) => updateColor(color, index)}
              deleteDataInformation={() => deleteDataInformation(index)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
