import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Skeleton } from "./page/dashboard/Skeleton";

function App() {
  return (
    <BrowserRouter>
      <Skeleton />
      {/*
      <Navigation />
*/}
    </BrowserRouter>
  );
}

export default App;
