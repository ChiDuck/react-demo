import ContentSection from "../components/ContentSection";
import Button from "../components/Button";
import "../styles/ListYourSalon.scss";

export default function ListYourSalon() {
  return (
    <ContentSection>
      <div className="salon-owner">
        <div>
          <h1>Are you a Salon Owner?</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ad
          placeat distinctio aliquid excepturi blanditiis iure, atque illo.
          Dolore, quas?
        </div>
        <Button text="List Your Salon" className="list-salon-button">List your salon</Button>
      </div>
    </ContentSection>
  );
}
