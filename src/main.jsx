import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { DataProviders } from "./assets/components/DataContext.jsx";
import LoginPage from "./assets/components/LoginPage.jsx";
import Homepage from "./assets/components/Homepage.jsx";
import MoviesPage from "./assets/components/MoviesPage.jsx";
import TVSeriesPage from "./assets/components/TVSeriesPage.jsx";
import BookmarkPage from "./assets/components/BookmarkPage.jsx";
import SignUpPage from "./assets/components/SignUpPage.jsx";
import NotFound from "./assets/components/NotFound.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DataProviders>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Homepage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/tvseries" element={<TVSeriesPage />} />
            <Route path="/bookmarked" element={<BookmarkPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DataProviders>
    </BrowserRouter>
  </StrictMode>
);
