import * as React from "react";
import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Roast } from "../../domain/Roast";
import { Rating } from "@mui/material";

export const ArchiveTable: FunctionComponent = () => {
  const testData1: Roast = {
    id: "123-456",
    name: "TestRöstung",
    data: [],
    bean: "TestBohne 1",
    rating: 3,
    createdAt: 0,
  };
  const testData2: Roast = {
    id: "123-456",
    name: "Beste Röstung",
    data: [],
    bean: "Bim Bam Bohne",
    rating: 2,
    createdAt: 1,
  };
  const testData3: Roast = {
    id: "123-456",
    name: "Schlechte Röstung",
    data: [],
    bean: "Rote Bohne",
    rating: 5,
    createdAt: 2,
  };
  const data = [testData1, testData2, testData3];

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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((roast, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>{roast.name}</TableCell>
              <TableCell>{roast.bean}</TableCell>
              <TableCell>{roast.createdAt}</TableCell>
              <TableCell>
                <Rating readOnly size={"small"} value={roast.rating} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
