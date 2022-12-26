import * as React from "react";
import { FunctionComponent, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Rating, TextField, Typography } from "@mui/material";
import { Roast } from "../../domain/roast/Roast";
import { roastRepository } from "../../domain/roast/RoastRepository";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import Title from "../shared/Title";

export const Save: FunctionComponent = () => {
  const { roastData } = useContext(MeasurementContext);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [bean, setBean] = useState("");
  const [rating, setRating] = useState(0);
  const [startWeight, setStartWeight] = useState<number>();
  const [endWeight, setEndWeight] = useState<number>();

  const save = () => {
    if (!(bean.length > 0 && name.length > 0)) {
      console.warn("Some validations failed!");
      return;
    }

    const roast: Roast = {
      bean,
      comment,
      createdAt: Date.now(),
      data: roastData,
      name,
      rating,
      startWeight,
      endWeight,
    };

    roastRepository.addRoast(roast).then(() => {
      setBean("");
      setName("");
      setRating(0);
      setComment("");
      setEndWeight(undefined);
      setStartWeight(undefined);
    });
  };

  return (
    <Grid container rowSpacing={2} xs={12} direction={"column"}>
      <Grid item>
        <Title>Details</Title>
      </Grid>

      <Grid item>
        <TextField
          required
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          required
          id="bean"
          label="Bohne"
          value={bean}
          onChange={(e) => setBean(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Grid item xs={6} pr={"2px"}>
            <TextField
              id="startWeight"
              label="Gewicht (Start)"
              value={startWeight}
              onChange={(e) => setStartWeight(Number(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} pl={"2px"}>
            <TextField
              id="endWeight"
              label="Gewicht (Ende)"
              value={endWeight}
              onChange={(e) => setEndWeight(Number(e.target.value))}
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <TextField
          id="comment"
          label="Comment"
          multiline
          maxRows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
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
