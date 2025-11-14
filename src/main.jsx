import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/main.scss";
import App from "./pages/App.jsx";
import SalonDetailPage from "./pages/SalonDetailPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/salon-detail", element: <SalonDetailPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
