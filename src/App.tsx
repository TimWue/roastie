import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ContentFrame } from "./page/content-frame/ContentFrame";
import { MeasurementContext } from "./infrastructure/MeasurementContext";
import { settingsRepository } from "./domain/settings/SettingsRepository";

function App() {
  const { subscribeToMeasurements, unsubscribeFromMeasurements } =
    useContext(MeasurementContext);

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      const topicNames = settings.mqtt.topics.map((topic) => topic.name);
      const host = settings.mqtt.host;
      try {
        subscribeToMeasurements(host, topicNames);
      } catch (e) {
        console.log(e);
      }
    });
    return unsubscribeFromMeasurements();
  }, []);

  return (
    <BrowserRouter>
      <ContentFrame />
    </BrowserRouter>
  );
}

export default App;
