import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { fileSystemAccess } from "../../infrastructure/FileSystemAccess";
import { Dialog, DialogTitle, Link, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export const Export: FunctionComponent<Props> = ({ isOpen }) => {
  const [blobUrl, setBlobUrl] = useState<string>();
  const [filename, setFilename] = useState<string>("Roastie-Backup");

  useEffect(() => {
    fileSystemAccess.exportDatabase().then(createUrlElement);
  });

  const createUrlElement = (blob: Blob) => {
    setBlobUrl(URL.createObjectURL(blob));
  };
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Export</DialogTitle>
      <Grid
        container
        width={"300px"}
        direction={"column"}
        rowSpacing={2}
        justifyContent="center"
        alignItems="center"
        pb={2}
        pt={2}
      >
        <Grid item>
          <TextField
            required
            id="filename"
            label="Dateiname"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Link href={blobUrl} download={filename}>
            Download
          </Link>
        </Grid>
      </Grid>
    </Dialog>
  );
};
