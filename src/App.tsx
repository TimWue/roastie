import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ContentFrame } from "./page/content-frame/ContentFrame";

function App() {
  return (
    <BrowserRouter>
      <ContentFrame />
    </BrowserRouter>
  );
}

export default App;
