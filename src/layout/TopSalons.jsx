import ContentSection from "../components/ContentSection";
import SalonCard from "../components/SalonCard";
import "../styles/TopSalons.scss";

function ViewAll() {
  return (
    <a className="view-all-button" href="#">
      View All &gt;
    </a>
  );
}

export default function Footer() {
  return (
    <ContentSection>
      <h1 className="salon-header">Top rated Salon near you</h1>
      <div className="salon-grid">
        <SalonCard
          picture="pictures/2be5716a6c96bb1efdf2082f548b691638876426.png"
          logo="logo/b9f21775293a2c2c86941e865ff81ff0a92ae96f.png"
          salon_name="Lathersalonaspen"
          description="Lorem Ipsum is simply dummy text of the printing typesetting industry."
          distance="5"
        />
        <SalonCard
          picture="pictures/2becab0c9e9e7ced826743be297d1556ed377b05.png"
          logo="logo/78c271d83498755d1ecfa74736576bef8b02c802.png"
          salon_name="IGK Hair"
          description="Lorem Ipsum is simply dummy text of the printing typesetting industry."
          distance="5"
        />
        <SalonCard
          picture="pictures/7cacf67fd6ae53bb3bae915aa9ca75c2d1394ddb.png"
          logo="logo/78c271d83498755d1ecfa74736576bef8b02c802.png"
          salon_name="Hawai'i"
          description="Lorem Ipsum is simply dummy text of the printing typesetting industry."
          distance="5"
        />
        <SalonCard
          picture="pictures/7f2704851f58aae290ac1da30b11f2280c662710.png"
          logo="logo/428d4bfe38d99ef3e2c6e064f4b437e5003c08fc.png"
          salon_name="Lathersalonaspen"
          description="Lorem Ipsum is simply dummy text of the printing typesetting industry."
          distance="5"
        />
        <SalonCard
          picture="pictures/9a7326a151e07f7097f85546103ee5d6d2240119.png"
          logo="logo/78c271d83498755d1ecfa74736576bef8b02c802.png"
          salon_name="IGK Hair"
          description="Lorem Ipsum is simply dummy text of the printing typesetting industry."
          distance="5"
        />
        <SalonCard
          picture="pictures/17c732de2bd6e0faa4808ce5e166a68e054b1448.png"
          logo="logo/78c271d83498755d1ecfa74736576bef8b02c802.png"
          salon_name="Hawai'i"
          description="Lorem Ipsum is simply dummy text of the printing typesetting industry."
          distance="5"
        />
        <SalonCard
          picture="pictures/36181e00bb3ade0e158d7e3324150db51ec5048e.png"
          logo="logo/78c271d83498755d1ecfa74736576bef8b02c802.png"
          salon_name="Lathersalonaspen"
          description="Lorem Ipsum is simply dummy text of the printing typesetting industry."
          distance="5"
        />
        <SalonCard
          picture="pictures/890587c286e077a1fff6f83617a64aea7afa2996.png"
          logo="logo/2964e0655dfbc971398f425a471b09d11eefab45.png"
          salon_name="IGK Hair"
          description="Lorem Ipsum is simply dummy text of the printing typesetting industry."
          distance="5"
        />
      </div>
      <ViewAll />
    </ContentSection>
  );
}
