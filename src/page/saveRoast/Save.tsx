import * as React from "react";
import { FunctionComponent, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Rating, TextField, Typography } from "@mui/material";
import { Roast, TimeSeries } from "../../domain/roast/Roast";
import { roastRepository } from "../../domain/roast/RoastRepository";
import {
  MeasurementContext,
  TopicsData,
} from "../../infrastructure/MeasurementContext";

export const Save: FunctionComponent = () => {
  const { topicsData } = useContext(MeasurementContext);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [bean, setBean] = useState("");
  const [rating, setRating] = useState(0);

  const topicsData2RoastData = (topicsData: TopicsData): TimeSeries[] => {
    const data: TimeSeries[] = [];
    topicsData.forEach((measurement, key) =>
      data.push({ values: measurement, name: key })
    );
    return data;
  };

  const save = () => {
    if (!(bean.length > 0 && name.length > 0)) {
      console.warn("Some validations failed!");
      return;
    }

    const roast: Roast = {
      bean: bean,
      comment: comment,
      createdAt: Date.now(),
      data: topicsData2RoastData(topicsData),
      name: name,
      rating: rating,
    };

    roastRepository.addRoast(roast).then(() => {
      setBean("");
      setName("");
      setRating(0);
      setComment("");
    });
  };

  return (
    <Grid container rowSpacing={2} xs={12} direction={"column"}>
      <Grid item>
        <TextField
          required
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          id="bean"
          label="Bohne"
          value={bean}
          onChange={(e) => setBean(e.target.value)}
        />
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
        <Rating
          size={"large"}
          sx={{ marginTop: "4px" }}
          value={rating}
          onChange={(event, newValue) => {
            newValue && setRating(newValue);
          }}
        />
      </Grid>
      <Grid
        item
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button size={"large"} variant="text" onClick={save}>
          Speichern
        </Button>
      </Grid>
    </Grid>
  );
};
