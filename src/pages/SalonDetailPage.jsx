import HeaderBar from "../layout/HeaderBar";
import Footer from "../Layout/Footer";
import SalonDetail from "../layout/SalonDetail";
import SalonDetailServices from "../layout/SalonDetailServices";
import SalonDetailMap from "../layout/SalonDetailMap";

export default function SalonDetailPage() {
  return (
    <>
      <HeaderBar />
      <SalonDetail />
      <SalonDetailServices />
      <SalonDetailMap />
      <Footer />
    </>
  );
}
