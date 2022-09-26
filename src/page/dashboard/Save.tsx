import * as React from "react";
import { FunctionComponent, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Rating, TextField, Typography } from "@mui/material";
import { Roast } from "../../domain/roast/Roast";
import { roastRepository } from "../../domain/roast/RoastRepository";

export const Save: FunctionComponent = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [bean, setBean] = useState("");
  const [rating, setRating] = useState(0);

  const save = () => {
    if (!(bean.length > 0 && name.length > 0)) {
      console.warn("Some validations failed!");
      return;
    }

    const roast: Roast = {
      bean: bean,
      comment: comment,
      createdAt: Date.now(),
      data: [],
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
