import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../shared/Title";
import { Roast } from "../../domain/roast/Roast";
import { Button, Rating, Tooltip } from "@mui/material";
import { roastRepository } from "../../domain/roast/RoastRepository";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Export } from "./Export";
import Grid from "@mui/material/Grid";
import { SelectTopic } from "../shared/SelectTopic";
import { ReferenceMeasurementContext } from "../../infrastructure/ReferenceMeasurementContext";

export const ArchiveTable: FunctionComponent = () => {
  const [roasts, setRoasts] = useState<Roast[]>();
  const [showExport, setShowExport] = useState(false);
  const { update: updateReferenceMeasurement, referenceTimeSeries } =
    useContext(ReferenceMeasurementContext);

  const loadRoasts = () => {
    roastRepository.getAllRoasts().then((newRoasts) => setRoasts(newRoasts));
  };

  const deleteRoast = (id: string) => {
    return roastRepository.deleteRoast(id).then(loadRoasts);
  };

  useEffect(loadRoasts, []);

  return (
    <>
      <Title>Röstungen</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nr.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Bohne</TableCell>
            <TableCell>Datum</TableCell>
            <TableCell>Bewertung</TableCell>
            <TableCell>Hinzufügen</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {roasts &&
            roasts.map((roast, index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{roast.name}</TableCell>
                <TableCell>{roast.bean}</TableCell>
                <TableCell>
                  {new Date(roast.createdAt).toDateString()}
                </TableCell>
                <TableCell>
                  <Rating readOnly size={"small"} value={roast.rating} />
                </TableCell>
                <TableCell>
                  {/*todo: check that roast is selected roast + topic*/}
                  {/*todo: setSelectedTopic not inline*/}
                  <SelectTopic
                    selectedTopic={
                      referenceTimeSeries ? referenceTimeSeries.name : ""
                    }
                    setSelectedTopic={(topic: string) =>
                      updateReferenceMeasurement(
                        roast,
                        roast.data
                          .map((timeSeries) => timeSeries.name)
                          .indexOf(topic)
                      )
                    }
                    topicNames={roast.data.map((timeSeries) => timeSeries.name)}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteRoast(roast.id!)}>
                    <Tooltip title="Löschen">
                      <DeleteIcon />
                    </Tooltip>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Grid container direction={"row"} justifyContent={"end"}>
        <Button onClick={loadRoasts}>
          <Tooltip title="Aktualisieren">
            <RefreshIcon />
          </Tooltip>
        </Button>
        <Button onClick={() => setShowExport(true)}>
          <Tooltip title="Export">
            <FileDownloadIcon />
          </Tooltip>
        </Button>
      </Grid>
      {showExport && (
        <Export isOpen={showExport} close={() => setShowExport(false)} />
      )}
    </>
  );
};
