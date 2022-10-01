import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ContentFrame } from "./page/ContentFrame/ContentFrame";
import { MeasurementContextProvider } from "./infrastructure/MeasurementContext";

function App() {
  return (
    <BrowserRouter>
      <MeasurementContextProvider>
        <ContentFrame />
      </MeasurementContextProvider>
    </BrowserRouter>
  );
}

export default App;
