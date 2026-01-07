import { GridDrag } from "../components/DragSnapDemo/GridDrag";
import MagneticDrag from "../components/DragSnapDemo/MagneticDrag";
import Header from "../layout/Header";
import ListYourSalon from "../layout/ListYourSalon";
import TopReviews from "../layout/TopReviews";
import TopSalons from "../layout/TopSalons";

export default function MainLayout() {
  return (
    <>
      <Header />
      <TopSalons />
      <TopReviews />
      <MagneticDrag />
      <GridDrag />
      {/* <SmartGrid /> */}
      <ListYourSalon />
    </>
  );
}
