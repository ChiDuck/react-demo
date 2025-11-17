import ContentSection from "../components/ContentSection";
import SalonDetailAction from "../components/SalonDetailAction";
import SalonDetailGallery from "../components/SalonDetailGallery";
import SalonDetailTitle from "../components/SalonDetailTitle";

export default function SalonDetail() {
  return (
    <>
      <ContentSection>
        <div style={{ margin: "20px 100px" }}>
          <SalonDetailTitle />
          <SalonDetailAction />
          <SalonDetailGallery />
        </div>
      </ContentSection>
    </>
  );
}
