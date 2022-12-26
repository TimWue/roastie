import * as React from "react";
import { FunctionComponent, useContext } from "react";
import {
  MeasurementContext,
  Status,
} from "../../infrastructure/MeasurementContext";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const Controls: FunctionComponent = () => {
  const {
    startMeasurement,
    stopMeasurement,
    resetMeasurement,
    measurementStatus,
  } = useContext(MeasurementContext);

  return (
    <ButtonGroup
      variant="outlined"
      size={"small"}
      sx={{ backgroundColor: "white" }}
    >
      <Button
        onClick={startMeasurement}
        disabled={measurementStatus == Status.RUNNING}
        size={"small"}
      >
        <Tooltip title={"Starten"}>
          <PlayArrowIcon />
        </Tooltip>
      </Button>
      <Button
        onClick={stopMeasurement}
        disabled={measurementStatus != Status.RUNNING}
      >
        <Tooltip title={"Pausieren"}>
          <PauseIcon />
        </Tooltip>
      </Button>
      <Button
        onClick={resetMeasurement}
        disabled={measurementStatus == Status.RUNNING}
      >
        <Tooltip title={"Reset"}>
          <RestartAltIcon />
        </Tooltip>
      </Button>
    </ButtonGroup>
  );
};
