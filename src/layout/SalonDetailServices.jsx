import ContentSection from "../components/ContentSection";
import ServiceCard from "../components/ServiceCard";
import style from "../styles/SalonDetailService.module.scss";

import { useEffect, useRef, useState } from "react";
function FullHeightMap({ servicesRef, children }) {
  const wrapperRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function updateHeight() {
      if (!servicesRef.current) return;

      const servicesTop =
        servicesRef.current.getBoundingClientRect().top + window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const pageWidth = window.innerWidth;
      if (pageWidth <= 1250) {
        setHeight(700);
        return;
      }
      setHeight(pageHeight - servicesTop);
    }

    window.addEventListener("resize", updateHeight);
    window.addEventListener("scroll", updateHeight); // optional
    updateHeight(); // initial

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", updateHeight);
    };
  }, [servicesRef]);

  return (
    <div
      className={style.mapWrapper}
      ref={wrapperRef}
      style={{
        height: `${height}px`,
      }}
    >
      <div style={{ pointerEvents: "auto", height: "100%" }}>{children}</div>
    </div>
  );
}

export default function SalonDetailServices({ children }) {
  const servicesRef = useRef(null);
  const [mapOpen, setMapOpen] = useState(true);
  return (
    <>
      <ContentSection>
        <div style={{ padding: "20px 30px 30px", backgroundColor: "#FAFAFA" }}>
          <h1>Services</h1>
          <div className={style.servicesSection}>
            <div ref={servicesRef} className={style.services}>
              <ServiceCard
                service_name="Nail Extension"
                description="Lorem Ipsum is simply dummy text of the printing  typesetting industry."
                price="149.99"
                picture="pictures\7f2704851f58aae290ac1da30b11f2280c662710.png"
              />
              <ServiceCard
                service_name="Nail Extension"
                description="Lorem Ipsum is simply dummy text of the printing  typesetting industry."
                price="149.99"
                picture="pictures\7f2704851f58aae290ac1da30b11f2280c662710.png"
              />
              <ServiceCard
                service_name="Nail Extension"
                description="Lorem Ipsum is simply dummy text of the printing  typesetting industry."
                price="149.99"
                picture="pictures\7f2704851f58aae290ac1da30b11f2280c662710.png"
              />
              <ServiceCard
                service_name="Nail Extension"
                description="Lorem Ipsum is simply dummy text of the printing  typesetting industry."
                price="149.99"
                picture="pictures\7f2704851f58aae290ac1da30b11f2280c662710.png"
              />
              <ServiceCard
                service_name="Nail Extension"
                description="Lorem Ipsum is simply dummy text of the printing  typesetting industry."
                price="149.99"
                picture="pictures\7f2704851f58aae290ac1da30b11f2280c662710.png"
              />
              <ServiceCard
                service_name="Nail Extension"
                description="Lorem Ipsum is simply dummy text of the printing  typesetting industry."
                price="149.99"
                picture="pictures\7f2704851f58aae290ac1da30b11f2280c662710.png"
              />
            </div>
            <FullHeightMap
              servicesRef={servicesRef}
              mapOpen={mapOpen}
              setMapOpen={setMapOpen}
            >
              {children}
            </FullHeightMap>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
