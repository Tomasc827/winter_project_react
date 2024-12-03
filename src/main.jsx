import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { DataProviders } from "./assets/components/DataContext.jsx";
import LoginPage from "./assets/components/LoginPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DataProviders>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LoginPage />} />
          </Route>
          <App />
        </Routes>
      </DataProviders>
    </BrowserRouter>
  </StrictMode>
);
