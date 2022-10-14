import * as React from "react";
import { FunctionComponent, useContext } from "react";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const Controls: FunctionComponent = () => {
  const {
    startMeasurement,
    stopMeasurement,
    resetMeasurement,
    measurementStarted,
  } = useContext(MeasurementContext);

  return (
    <ButtonGroup variant="contained" size={"small"}>
      <Button onClick={startMeasurement} disabled={measurementStarted}>
        <Tooltip title={"Starten"}>
          <PlayArrowIcon />
        </Tooltip>
      </Button>
      <Button onClick={stopMeasurement} disabled={!measurementStarted}>
        <Tooltip title={"Pausieren"}>
          <PauseIcon />
        </Tooltip>
      </Button>
      <Button onClick={resetMeasurement} disabled={measurementStarted}>
        <Tooltip title={"Reset"}>
          <RestartAltIcon />
        </Tooltip>
      </Button>
    </ButtonGroup>
  );
};
