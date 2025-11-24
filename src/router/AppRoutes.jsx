import { createBrowserRouter } from "react-router-dom";
import { action as reviewAction } from "../components/ReviewForm/action";
import App from "../pages/App";
import MainLayout from "../pages/MainLayout";
import { salonDetailLoader } from "../pages/SalonDetail/loader";
import SalonDetailPage from "../pages/SalonDetail/SalonDetailPage";
import { salonReviewLoader } from "../pages/SalonReview/loader";
import SalonReviewPage from "../pages/SalonReview/SalonReviewPage";
import { viewReviewLoader } from "../pages/ViewReview/loader";
import ViewReviewPage from "../pages/ViewReview/ViewReviewPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainLayout /> },
      {
        path: "salon-detail/:id",
        element: <SalonDetailPage />,
        loader: salonDetailLoader,
      },
      {
        path: "writereview/:id",
        element: <SalonReviewPage />,
        loader: salonReviewLoader,
        action: reviewAction,
      },
      {
        path: "viewreview/:id",
        element: <ViewReviewPage />,
        loader: viewReviewLoader,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);
export default routes;
