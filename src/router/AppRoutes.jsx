import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import MainLayout from "../pages/MainLayout";
import SalonDetailPage from "../pages/SalonDetailPage";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainLayout /> },
      { path: "salon-detail", element: <SalonDetailPage /> },
    ],
  },
]);
export default routes;
