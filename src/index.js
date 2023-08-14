import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import useThemeContext from "./hooks/useThemeContext";
import ThemeProvider from "./context/ThemeProvider";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

import "./styles/index.scss";
import "inter-ui/inter.css";

function Main() {
  const { currentTheme } = useThemeContext();

  return (
    <MantineProvider
      theme={{
        colorScheme: currentTheme,
        fontFamily: "Inter",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <App />
    </MantineProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Main />
      <Toaster position="bottom-right" />
    </ThemeProvider>
  </React.StrictMode>
);
