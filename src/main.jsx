import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CitiesProvider } from "./contexts/CitiesContext";
const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <CitiesProvider>
    <App />
  </CitiesProvider>
);
