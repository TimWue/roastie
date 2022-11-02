import * as React from "react";
import { FunctionComponent } from "react";
import { DataInformation, TopicName } from "../../domain/settings/Settings";
import Grid from "@mui/material/Grid";
import { DataInformationItem } from "./DataInformationItem";

interface Props {
  dataInformation: DataInformation[];
  setDataInformation: (dataInformation: DataInformation[]) => void;
  topicNames: TopicName[];
}

export const DataInformationList: FunctionComponent<Props> = ({
  dataInformation,
  setDataInformation,
  topicNames,
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

  const updateTopicName = (newName: string, index: number) => {
    const newDataInformation = dataInformation.map((dataInformation, idx) => {
      if (idx === index) {
        dataInformation.topicName = newName;
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

  const updateShow = (show: boolean, index: number) => {
    console.log(show);
    const newDataInformation = dataInformation.map((dataInformation, idx) => {
      if (idx === index) {
        dataInformation.show = show;
      }
      return dataInformation;
    });
    setDataInformation(newDataInformation);
  };

  return (
    <>
      {dataInformation.map((dataInformation, index) => {
        return (
          <Grid item>
            <DataInformationItem
              updateShow={(show: boolean) => updateShow(show, index)}
              updateTopicName={(name: string) => updateTopicName(name, index)}
              dataInformation={dataInformation}
              updateDisplayName={(name: string) =>
                updateDisplayName(name, index)
              }
              updateColor={(color: string) => updateColor(color, index)}
              deleteDataInformation={() => deleteDataInformation(index)}
              topicNames={topicNames}
            />
          </Grid>
        );
      })}
    </>
  );
};
