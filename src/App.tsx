import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ContentFrame } from "./page/content-frame/ContentFrame";

function App() {
  return (
    <BrowserRouter basename={"roastie"}>
      <ContentFrame />
    </BrowserRouter>
  );
}

export default App;
