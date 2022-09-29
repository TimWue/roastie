import * as React from "react";
import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Title from "../shared/Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

interface Props {
  title: string;
  value: string;
  unit: string;
}

export const DetailValue: FunctionComponent<Props> = ({
  title,
  value,
  unit,
}) => {
  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          px: 1,
          py: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: 110,
          overflow: "hidden",
        }}
      >
        <Title>{title}</Title>
        <Typography component="p" variant="h4">
          {value}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {unit}
        </Typography>
      </Paper>
    </Grid>
  );
};
