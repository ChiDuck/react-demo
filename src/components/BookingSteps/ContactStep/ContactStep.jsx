export default function ContactStep() {
  return (
    <>
      <div className="text-center">
        <h3>Contact Information</h3>
        <p>Please provide your contact details for the booking.</p>
      </div>
      <div className="contact-info">
        <h4>Primary Contact</h4>
        <label htmlFor="Your Name">Your Name</label>
        <input type="text" />
        <label htmlFor="Phone Number">Phone Number</label>
        <input type="text" />
        <label htmlFor="Email Address">
          Email Address <span>(Option?)</span>
        </label>
        <input type="text" />
      </div>
    </>
  );
}
