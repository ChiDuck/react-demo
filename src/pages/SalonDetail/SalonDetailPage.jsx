import { useLoaderData } from "react-router-dom";
import SalonDetail from "../../layout/SalonDetail";
import SalonDetailMap from "../../layout/SalonDetailMap";
import SalonDetailServices from "../../layout/SalonDetailServices";

export default function SalonDetailPage() {
  const data = useLoaderData();
  return (
    <>
      <SalonDetail detail={data.detail} gallery={data.gallery} />
      <SalonDetailServices services={data.services}>
        <SalonDetailMap detail={data.detail} />
      </SalonDetailServices>
    </>
  );
}
