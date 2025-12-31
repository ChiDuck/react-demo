import { useEffect } from "react";
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

export default function ConfirmStep({ state, setConfirm, noteRef }) {
  const parser = JSON.parse(state.inforUser);
  let subtotal = 0;

  useEffect(() => {
    setConfirm(false);
  }, []);

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
              {formatBookingDate(state.selectedDate.currentdate)} at{" "}
              {state.selectedTime}
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
            {state.selectedTechnician?.map((t) => (
              <div key={t.id}>{t.nickname || t.firstname}</div>
            ))}
            {state.selectedTechnician.length < state.guests && (
              <div>Anyone Available</div>
            )}
          </div>
        </div>
        <div className="service">
          <h4>Services</h4>
          {state.selectedService.map((item, i) => {
            subtotal += item.quantity * item.price;
            return (
              <div key={i}>
                <div>
                  <strong>
                    {item.name} x {item.quantity}
                  </strong>
                  <br />
                  <span>{item.minutes} min each</span>
                </div>
                <strong>${item.price.toFixed(2)}</strong>
              </div>
            );
          })}
          <h4 className="mt-3 mb-2">Payment Summary</h4>
          <div className="payment">
            <div>
              <span>Est. Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div>
              <span>Tax ({state.tax}%)</span>
              <strong>${((subtotal * state.tax) / 100).toFixed(2)}</strong>
            </div>
            <div>
              <span>Est. Total</span>
              <strong>
                ${(subtotal + (subtotal * state.tax) / 100).toFixed(2)}
              </strong>
            </div>
          </div>
        </div>
        <div className="note">
          <h4>Special Notes</h4>
          <textarea
            name=""
            id=""
            onChange={(e) => (noteRef.current = e.target.value)}
            placeholder="Enter special notes"
          ></textarea>
        </div>
        <div className="policy">
          <div>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                name=""
                id=""
                onChange={() => setConfirm((prev) => !prev)}
              />
              By checking this box, you agree to our{" "}
              <span>Terms and Conditions, Privacy Policy</span>, and{" "}
              <span>Disclaimer.</span>
            </label>
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
