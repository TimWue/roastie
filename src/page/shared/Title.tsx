import * as React from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      whiteSpace={"nowrap"}
      overflow={"hidden"}
      textOverflow={"ellipsis"}
      textAlign={"center"}
    >
      {props.children}
    </Typography>
  );
}
