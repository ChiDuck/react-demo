import { Outlet } from "react-router-dom";
import "../App.css";
import Footer from "../layout/Footer";
import HeaderBar from "../layout/HeaderBar";

export default function App() {
  return (
    <>
      <HeaderBar />
      <Outlet />
      <Footer />
    </>
  );
}
