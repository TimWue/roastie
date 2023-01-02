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
import { TopicName } from "../../domain/settings/Settings";

export const ArchiveTable: FunctionComponent = () => {
  const [roasts, setRoasts] = useState<Roast[]>();
  const [showExport, setShowExport] = useState(false);
  const {
    update: updateReferenceMeasurement,
    referenceTopicName,
    remove: removeReferenceMeasurement,
    referenceRoastId,
  } = useContext(ReferenceMeasurementContext);

  const loadRoasts = () => {
    roastRepository.getAllRoasts().then((newRoasts) => setRoasts(newRoasts));
  };

  const deleteRoast = (id: string) => {
    return roastRepository.deleteRoast(id).then(loadRoasts);
  };

  const calcWeightLoss = (
    startWeight: number | undefined,
    endWeight: number | undefined
  ): string => {
    if (startWeight === undefined || endWeight === undefined) {
      return "--";
    }
    const weightLoss = 100 * (1 - endWeight / startWeight);
    return weightLoss.toFixed(2) + "%";
  };

  useEffect(loadRoasts, []);

  return (
    <Grid container flexWrap={"wrap"} p={"10px"} width={"100%"}>
      <Grid item xs={12}>
        <Title>Röstungen</Title>
      </Grid>
      <Grid item xs={12} overflow={"auto"}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nr.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Bohne</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Bewertung</TableCell>
              <TableCell>Hinzufügen</TableCell>
              <TableCell>Start-Gewicht</TableCell>
              <TableCell>Δ Gewicht</TableCell>
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
                    <SelectTopic
                      selectedTopic={
                        referenceRoastId === roast.id
                          ? referenceTopicName
                          : undefined
                      }
                      setSelectedTopic={(topicName: TopicName | undefined) => {
                        topicName
                          ? updateReferenceMeasurement(roast, topicName)
                          : removeReferenceMeasurement();
                      }}
                      topicNames={Array.from(roast.data.keys())}
                    />
                  </TableCell>

                  <TableCell>{roast.startWeight ?? "--"}</TableCell>
                  <TableCell>
                    {calcWeightLoss(roast.startWeight, roast.endWeight)}
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
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
      {showExport && (
        <Export isOpen={showExport} close={() => setShowExport(false)} />
      )}
    </Grid>
  );
};
