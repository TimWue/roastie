import * as React from "react";
import { FunctionComponent } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

interface Props {}

export const Sidebar: FunctionComponent<Props> = ({}) => {
  const navigate = useNavigate();
  return (
    <>
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/archive")}>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/settings")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
        </ListItemButton>
      </List>
      {/*<img src={logo} style={{ margin: "auto 5px 10px 5px" }} />*/}
    </>
  );
};
