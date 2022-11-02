import * as React from "react";
import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid";
import { Button, Input, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataInformation } from "../../domain/settings/Settings";
import Box from "@mui/material/Box";

interface Props {
  dataInformation: DataInformation;
  updateDisplayName: (name: string) => void;
  updateColor: (color: string) => void;
  deleteDataInformation: () => void;
}

export const DataInformationItem: FunctionComponent<Props> = ({
  dataInformation,
  updateDisplayName,
  updateColor,
  deleteDataInformation,
}) => {
  return (
    <Grid
      container
      direction={"column"}
      p={"5px"}
      style={{ borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.075)" }}
    >
      <Grid item p={"5px"}>
        <Input
          fullWidth
          endAdornment={
            <Tooltip title={"Löschen"}>
              <Button onClick={deleteDataInformation}>
                <DeleteIcon />
              </Button>
            </Tooltip>
          }
          value={dataInformation.displayName}
          onChange={(event) => {
            updateDisplayName(event.currentTarget.value);
          }}
        />
      </Grid>
      <Grid item p={"5px"}>
        <Grid container direction={"row"} width={"100%"}>
          <Input
            fullWidth
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
      </Grid>
    </Grid>
  );
};
