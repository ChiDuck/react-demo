import { createBrowserRouter, Navigate } from "react-router-dom";
import { action as reviewAction } from "../components/ReviewForm/action";
import AccountSettingSection from "../components/UserProfile/AccountSettingSection/AccountSettingSection";
import AppointmentsSection from "../components/UserProfile/AppointmentsSection/AppointmentsSection";
import { userAppointmentLoader } from "../components/UserProfile/AppointmentsSection/loader";
import FavoriteSection from "../components/UserProfile/FavoriteSection/FavoriteSection";
import { userFavoriteLoader } from "../components/UserProfile/FavoriteSection/loader";
import GallerySection from "../components/UserProfile/GallerySection/GallerySection";
import { userGalleryLoader } from "../components/UserProfile/GallerySection/loader";
import { editReview } from "../components/UserProfile/ReviewSection/action";
import { userReviewLoader } from "../components/UserProfile/ReviewSection/loader";
import ReviewSection from "../components/UserProfile/ReviewSection/ReviewSection";
import App from "../pages/App";
import MainLayout from "../pages/MainLayout";
import { salonDetailLoader } from "../pages/SalonDetail/loader";
import SalonDetailPage from "../pages/SalonDetail/SalonDetailPage";
import { salonReviewLoader } from "../pages/SalonReview/loader";
import SalonReviewPage from "../pages/SalonReview/SalonReviewPage";
import { userProfileLoader } from "../pages/UserPage/loader";
import UserPage from "../pages/UserPage/UserPage";
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
  {
    path: "/profile",
    element: <UserPage />,
    shouldRevalidate: ({
      currentUrl,
      nextUrl,
      actionResult,
      defaultShouldRevalidate,
    }) => {
      // Skip revalidation when navigating from /profile/... to another /profile/... child.
      const sameParent = nextUrl.pathname.startsWith("/profile");
      if (sameParent) return false;

      // fallback to router default behaviour
      return defaultShouldRevalidate();
    },
    children: [
      {
        index: true,
        element: <Navigate to="appt" replace />,
      },
      {
        path: "appt",
        element: <AppointmentsSection />,
        loader: userAppointmentLoader,
      },
      {
        path: "review",
        element: <ReviewSection />,
        loader: userReviewLoader,
        action: editReview,
        // shouldRevalidate: ({ actionResult }) => {
        //   if (actionResult?.action === "edit-review") return false;
        //   return true;
        // },
      },
      {
        path: "gallery",
        element: <GallerySection />,
        loader: userGalleryLoader,
      },
      {
        path: "fav",
        element: <FavoriteSection />,
        loader: userFavoriteLoader,
      },
      {
        path: "set",
        element: <AccountSettingSection />,
      },
    ],
    loader: userProfileLoader,
  },
]);

export default routes;
