import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Roast } from "../../domain/Roast";
import { Button, Rating } from "@mui/material";
import { roastRepository } from "../../domain/RoastRepository";
import DeleteIcon from "@mui/icons-material/Delete";
import { Export } from "./Export";

export const ArchiveTable: FunctionComponent = () => {
  const [roasts, setRoasts] = useState<Roast[]>();
  const [showExport, setShowExport] = useState(false);

  const deleteRoast = (id: string) => {
    return roastRepository.deleteRoast(id);
  };

  useEffect(() => {
    roastRepository.getAllRoasts().then((newRoasts) => setRoasts(newRoasts));
  }, [deleteRoast]);

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
                  <Button>
                    <DeleteIcon onClick={() => deleteRoast(roast.id!)} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button onClick={() => setShowExport(true)}>Export</Button>
      <Export isOpen={showExport} close={() => setShowExport(false)} />
    </>
  );
};
