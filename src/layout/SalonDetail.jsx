import ContentSection from "../components/ContentSection";
import SalonDetailAction from "../components/SalonDetailAction";
import SalonDetailGallery from "../components/SalonDetailGallery";
import SalonDetailTitle from "../components/SalonDetailTitle";
import style from "../styles/SalonDetail.module.scss";

export default function SalonDetail() {
  return (
    <>
      <ContentSection>
        <div style={{ margin: "30px 100px 50px" }}>
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
