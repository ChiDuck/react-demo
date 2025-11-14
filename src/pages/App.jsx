import "../App.css";
import Header from "../Layout/Header.jsx";
import TopSalons from "../Layout/TopSalons.jsx";
import TopReviews from "../Layout/TopReviews.jsx";
import Footer from "../Layout/Footer.jsx";
import ListYourSalon from "../Layout/ListYourSalon.jsx";
import HeaderBar from "../layout/HeaderBar.jsx";

export default function App() {
  return (
    <>
      <HeaderBar />
      <Header />
      <TopSalons />
      <TopReviews />
      <ListYourSalon />
      <Footer />
    </>
  );
}
