import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotificationSettings from "./pages/NotificationSettings";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/notification-settings"
            element={<NotificationSettings />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
