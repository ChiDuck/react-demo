import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import MainLayout from "../pages/MainLayout";
import SalonDetailPage from "../pages/SalonDetailPage";

async function loader({ params, request }) {
  const id = params.id;
  console.log("loader running", params, request.url);
  const res = await fetch(
    `https://dev.nail360.info/light/api/public?s=GetSalonDetail&salonid=${encodeURIComponent(
      id
    )}`,
    { signal: request.signal }
  );

  if (res.status === 404) {
    // tell router to render errorElement or show 404
    throw new Response("Not found", { status: 404 });
  }
  if (!res.ok) {
    throw new Response("Loader failed", { status: res.status });
  }

  const json = await res.json();
  return json.data;
}
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainLayout /> },
      {
        path: "salon-detail/:id",
        element: <SalonDetailPage />,
        loader: loader,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);
export default routes;
