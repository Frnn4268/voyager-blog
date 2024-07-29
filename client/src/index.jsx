import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={1}> 
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);