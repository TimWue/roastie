import { FunctionComponent, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Navigation: FunctionComponent = ({}) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Home" onClick={() => navigate("/")} />
      <BottomNavigationAction label="Neu" onClick={() => navigate("/roast")} />
      <BottomNavigationAction
        label="Archiv"
        onClick={() => navigate("/archive")}
      />
    </BottomNavigation>
  );
};
