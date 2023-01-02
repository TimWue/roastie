import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../dashboard/Dashboard";
import { SettingsManagement } from "../settings/SettingsManagement";
import { ArchiveTable } from "../archive/ArchiveTable";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { settingsRepository } from "../../domain/settings/SettingsRepository";
import Grid from "@mui/material/Grid";
import { AlertBar } from "./AlertBar";
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
  const [subscriptionError, setSubscriptionError] = useState(false);
  const totalHeight = window.innerHeight;
  const appBarHeight = 64;
  const contentHeight = totalHeight - appBarHeight;
  const drawerWidth = 70;

  const { subscribeToMeasurements, unsubscribeFromMeasurements } =
    useContext(MeasurementContext);

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      const topicNames = settings.mqtt.topicNames;
      const host = settings.mqtt.host;
      try {
        subscribeToMeasurements(host, topicNames);
        setSubscriptionError(false);
      } catch (e) {
        console.log(e);
        setSubscriptionError(true);
      }
    });
    return unsubscribeFromMeasurements();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Grid
        container
        height={`${totalHeight}px`}
        direction={"column"}
        flexWrap={"nowrap"}
      >
        <Grid
          item
          xs={12}
          md={12}
          height={`${appBarHeight}px`}
          maxHeight={`${appBarHeight}px`}
        >
          <TopBar />
        </Grid>
        {subscriptionError && (
          <AlertBar clearError={() => setSubscriptionError(false)} />
        )}
        <Grid
          item
          xs={12}
          height={`${contentHeight}px`}
          direction={"row"}
          flexWrap={"nowrap"}
        >
          <Grid
            container
            width={"100%"}
            flexWrap={"nowrap"}
            height={"100%"}
            flexDirection={"row"}
          >
            <Grid item width={`${drawerWidth}px`}>
              <Sidebar />
            </Grid>
            <Grid item sx={{ width: `calc(100%-${drawerWidth}px)` }} p={"10px"}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/archive" element={<ArchiveTable />} />
                <Route path="/settings" element={<SettingsManagement />} />
              </Routes>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
