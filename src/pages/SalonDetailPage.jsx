import SalonDetail from "../layout/SalonDetail";
import SalonDetailMap from "../layout/SalonDetailMap";
import SalonDetailServices from "../layout/SalonDetailServices";

export default function SalonDetailPage() {
  return (
    <>
      <SalonDetail />
      <SalonDetailServices>
        <SalonDetailMap />
      </SalonDetailServices>
    </>
  );
}
