import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {RegisterProvider} from "./context/context.jsx";
import "./main.css"

const theme = createTheme({
  palette: {
    primary: {
      main: '#151515',
    },
    secondary: {
      main: '#6200EE',
    },
    info: {
      main: '#EBEBEB',
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RegisterProvider>
          <App />
        </RegisterProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
