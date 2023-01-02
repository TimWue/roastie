import * as React from "react";
import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material";

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
  const theme = useTheme();

  return (
    <Grid item>
      <Grid
        container
        p={"8px"}
        borderRadius={"4px"}
        columnGap={"10px"}
        alignItems={"center"}
        justifyContent={"center"}
        border={`2px solid ${theme.palette.primary.main}`}
      >
        <Grid item marginTop={"auto"} marginBottom={"auto"}>
          <Grid container gap={"4px"}>
            <Typography component="p" variant="h6">
              {value}
            </Typography>

            <Typography component="p" variant="h6" color={"darkgray"}>
              {unit}
            </Typography>
          </Grid>
        </Grid>
        <Grid item marginTop={"auto"} marginBottom={"auto"}>
          <Grid container flexDirection={"column"}>
            <Grid item>{title}</Grid>
            <Grid item fontWeight={"bold"}>
              {displayName}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
