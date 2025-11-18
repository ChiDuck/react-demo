import ContentSection from "../components/ContentSection";
import SalonDetailAction from "../components/SalonDetailAction";
import SalonDetailGallery from "../components/SalonDetailGallery";
import SalonDetailTitle from "../components/SalonDetailTitle/SalonDetailTitle";
import style from "../styles/SalonDetail.module.scss";

export default function SalonDetail() {
  return (
    <>
      <ContentSection>
        <div className={style.salonDetail}>
          <div
            className={style.titleFlex}
            style={{
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <SalonDetailTitle />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0 }}>
              <SalonDetailAction />
            </div>
          </div>
          <SalonDetailGallery />
        </div>
      </ContentSection>
    </>
  );
}
