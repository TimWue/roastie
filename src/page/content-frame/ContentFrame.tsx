import * as React from "react";
import { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../dashboard/Dashboard";
import { SettingsManagement } from "../settings/SettingsManagement";
import { ArchiveTable } from "../archive/ArchiveTable";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

export const drawerWidth: number = 240;

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#2596be",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

export const ContentFrame: FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar open={open} toggleDrawer={toggleDrawer} />
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/archive" element={<ArchiveTable />} />
            <Route path="/settings" element={<SettingsManagement />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
