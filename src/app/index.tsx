import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

function AppContainer() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default AppContainer;
