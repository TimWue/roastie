import * as React from "react";
import { FunctionComponent, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Rating, TextField, Typography } from "@mui/material";

export const Save: FunctionComponent = () => {
  const [comment, setComment] = useState<string>();
  return (
    <Grid container rowSpacing={2} xs={12} direction={"column"}>
      <Grid item>
        <TextField required id="name" label="Name" />
      </Grid>
      <Grid item>
        <TextField required id="bean" label="Bohne" />
      </Grid>

      <Grid item>
        <TextField
          id="comment"
          label="Comment"
          multiline
          maxRows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Typography component="legend">Bewertung</Typography>
        <Rating size={"large"} sx={{ marginTop: "4px" }} />
      </Grid>
      <Grid
        item
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button size={"large"} variant="text">
          Speichern
        </Button>
      </Grid>
    </Grid>
  );
};
