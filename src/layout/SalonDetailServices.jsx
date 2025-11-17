import ContentSection from "../components/ContentSection";
import ServiceCard from "../components/ServiceCard";
import style from "../styles/SalonDetail.module.scss";

export default function SalonDetailServices() {
  return (
    <ContentSection>
      <div className={style.services}>
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
    </ContentSection>
  );
}
