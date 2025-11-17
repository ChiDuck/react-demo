import SalonDetail from "../layout/SalonDetail";
import SalonDetailMap from "../layout/SalonDetailMap";
import SalonDetailServices from "../layout/SalonDetailServices";

export default function SalonDetailPage() {
  return (
    <>
      <SalonDetail />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
        }}
      >
        <SalonDetailServices />
        <SalonDetailMap />
      </div>
    </>
  );
}
