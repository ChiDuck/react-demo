import ContentSection from "../components/ContentSection";
import FooterSocial from "../components/FooterSocial";

function FooterColumn({ title, items }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <ul className="footer-list">
        {items.map((item, index) => (
          <li key={index}>
            <a href="#" style={{ textDecoration: "none", color: "gray" }}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <ContentSection>
      <div className="footer">
        <FooterColumn
          title="Quick Links"
          items={["About", "Services", "Salon Owner"]}
        />
        <FooterColumn
          title="Information"
          items={["Testimonial", "Contact Us", "Help"]}
        />
        <FooterColumn
          title="nail360"
          items={["Term and Conditions", "Refund Policy", "Privacy"]}
        />
        <FooterColumn
          title="Contact Us"
          items={[
            "12345 Little Lonsdale St, Melbourne",
            "Phone: (123) 123-456",
            "E-Mail: office@nail360.com",
          ]}
        />
      </div>
      <div className="footer-note">
        <span style={{ fontSize: 20 }}>
          ©2024 Nail360. All rights reserved.
        </span>
        <div>
          <FooterSocial icons="/social-icon/Group.svg" />
          <FooterSocial icons="/social-icon/Group1.svg" />
          <FooterSocial icons="/social-icon/Group2.svg" />
          <FooterSocial icons="/social-icon/Group3.svg" />
          <FooterSocial icons="/social-icon/Group4.svg" />
          <FooterSocial icons="/social-icon/Group5.svg" />
        </div>
      </div>
    </ContentSection>
  );
}
