import * as React from "react";
import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Title from "../shared/Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

interface Props {
  value: number;
  title: string;
  unit: string;
  displayName: string;
}

export const DetailValue: FunctionComponent<Props> = ({
  title,
  unit,
  value,
  displayName,
}) => {
  return (
    <Grid item xs={12} width={"250px"}>
      <Paper
        sx={{
          px: 1,
          py: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
        variant={"outlined"}
      >
        <Title>
          {title} [{unit}]
        </Title>
        <Typography component="p" variant="h4">
          {value}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {displayName}
        </Typography>
      </Paper>
    </Grid>
  );
};
