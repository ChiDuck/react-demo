import { useLoaderData, useParams } from "react-router-dom";
import SalonDetail from "../../layout/SalonDetail";
import SalonDetailMap from "../../layout/SalonDetailMap";
import SalonDetailServices from "../../layout/SalonDetailServices";

export default function SalonDetailPage() {
  const data = useLoaderData();
  const { id } = useParams();
  return (
    <>
      <SalonDetail detail={data.detail} gallery={data.gallery} salonid={id} />
      <SalonDetailServices services={data.services}>
        <SalonDetailMap detail={data.detail} />
      </SalonDetailServices>
    </>
  );
}
