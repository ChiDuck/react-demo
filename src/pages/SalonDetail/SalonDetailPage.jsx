import { useLoaderData, useParams } from "react-router-dom";
import SalonDetailGallery from "../../components/SalonDetailGallery";
import SalonDetail from "../../layout/SalonDetail";
import SalonDetailMap from "../../layout/SalonDetailMap";
import SalonDetailServices from "../../layout/SalonDetailServices";

export default function SalonDetailPage() {
  const data = useLoaderData();
  const { id } = useParams();
  return (
    <>
      <div style={{ margin: "20px auto", maxWidth: "1100px" }}>
        <SalonDetail detail={data.detail.data} salonid={id} />
        <SalonDetailGallery gallery={data.gallery.data} />
      </div>
      <SalonDetailServices services={data.services.data}>
        <SalonDetailMap detail={data.detail.data} />
      </SalonDetailServices>
    </>
  );
}
