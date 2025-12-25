import "../BookingSteps.scss";

function formatBookingDate(dateInput) {
  const date = new Date(dateInput);

  const datePart = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  }).format(date);

  return datePart;
}

export default function ConfirmStep({ state, dispatch }) {
  const parser = JSON.parse(state.inforUser);

  return (
    <>
      <div className="text-center">
        <h3>Confirm Your Booking</h3>
        <p>Please review your booking details below.</p>
      </div>
      <div className="confirm-info">
        <div className="date">
          <div>
            <span>Date:</span>
            <strong>
              {formatBookingDate(state.selectedDate)} at {state.selectedTime}
            </strong>
          </div>
          <div>
            <span>Number of Guests</span>
            <strong>{state.guests} Guest(s)</strong>
          </div>
        </div>
        <div className="contact">
          <h4>Contact Information</h4>
          <div>
            <div>
              <span>Name</span>
              <strong>{parser.name}</strong>
            </div>
            <div>
              <span>Phone Number</span>
              <strong>{parser.phone}</strong>
            </div>
            <div>
              <span>Email Address</span>
              <strong>{parser.email}</strong>
            </div>
          </div>
        </div>
        <div className="tech">
          <h4>Technician Preferences</h4>
          <div>
            {state.selectedTechnician.length > 0 ? (
              state.selectedTechnician.map((t) => (
                <div key={t.id}>{t.nickname || t.firstname}</div>
              ))
            ) : (
              <div>Anyone Available</div>
            )}
          </div>
        </div>
        <div className="service">
          <h4>Services</h4>
          {state.selectedService.map((item) => (
            <div>
              <div>
                <strong>
                  {item.name} x {item.quantity}
                </strong>
                <br />
                <span>{item.minutes} min each</span>
              </div>
              <strong>${item.price.toFixed(2)}</strong>
            </div>
          ))}
          <h4 className="mt-3 mb-2">Payment Summary</h4>
          <div className="payment">
            <div>
              <span>Est. Subtotal</span>
              <strong>$5.00</strong>
            </div>
            <div>
              <span>Tax ({state.tax}%)</span>
              <strong>$5.00</strong>
            </div>
            <div>
              <span>Est. Total</span>
              <strong>$5.00</strong>
            </div>
          </div>
        </div>
        <div className="note">
          <h4>Special Notes</h4>
          <textarea name="" id="" placeholder="Enter special notes"></textarea>
        </div>
        <div className="policy">
          <div>
            <input type="checkbox" name="" id="" />
            By checking this box, you agree to our{" "}
            <span>Terms and Conditions, Privacy Policy</span>, and{" "}
            <span>Disclaimer</span>.
          </div>
          <span>
            *Total is an estimate. Final price may vary based on add-ons or
            requests.
          </span>
        </div>
      </div>
    </>
  );
}
