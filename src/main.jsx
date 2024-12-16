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
import ProtectedRoute from "./assets/components/ProtectedRoute.jsx";
import Forbidden from "./assets/components/Forbidden.jsx";
import Description from "./assets/components/cards/Description.jsx";
import AdminUpdateModal from "./assets/components/avatar_modals/AdminUpdateModal.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DataProviders>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Homepage />}>
              <Route path="/description/:showID" element={<Description />} />
              <Route
                path="/admin/:showID"
                element={
                  <ProtectedRoute>
                    <AdminUpdateModal />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
            <Route path="/movies" element={<MoviesPage />}>
              <Route
                path="/movies/description/:showID"
                element={<Description />}
              />
              <Route
                path="/movies/admin/:showID"
                element={
                  <ProtectedRoute>
                    <AdminUpdateModal />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
            <Route path="/tvseries" element={<TVSeriesPage />}>
              <Route
                path="/tvseries/description/:showID"
                element={<Description />}
              />
              <Route
                path="/tvseries/admin/:showID"
                element={
                  <ProtectedRoute>
                    <AdminUpdateModal />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
            <Route
              path="/bookmarked"
              element={
                <ProtectedRoute>
                  <BookmarkPage />
                </ProtectedRoute>
              }
            >
              <Route
                path="/bookmarked/description/:showID"
                element={<Description />}
              />
              <Route
                path="/bookmarked/admin/:showID"
                element={
                  <ProtectedRoute>
                    <AdminUpdateModal />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
        </Routes>
      </DataProviders>
    </BrowserRouter>
  </StrictMode>
);
