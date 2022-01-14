import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css"; // Tell webpack that Button.js uses these styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
