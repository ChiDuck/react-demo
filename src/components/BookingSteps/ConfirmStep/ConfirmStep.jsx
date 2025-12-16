export default function ConfirmStep() {
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
            <strong>Friday, December 26 at 04:00 PM</strong>
          </div>
          <div>
            <span>Number of Guests</span>
            <strong>1 Guest(s)</strong>
          </div>
        </div>
        <div className="contact">
          <h4>Contact Information</h4>
          <div>
            <div>
              <span>Name</span>
              <strong>NTP ÙwÚ Oni-Chan Baka</strong>
            </div>
            <div>
              <span>Phone Number</span>
              <strong>(888) 678-6785</strong>
            </div>
            <div>
              <span>Email Address</span>
              <strong>ntp5405@gmail.com</strong>
            </div>
          </div>
        </div>
        <div className="tech">
          <h4>Technician Preferences</h4>
          <div>
            <div>Anyone Available</div>
            <div>Anyone Available</div>
          </div>
        </div>
        <div className="service">
          <h4>Services</h4>
          <div>
            <div>
              <strong>Callus Removal x 1</strong>
              <span>1 min each</span>
            </div>
            <strong>$5.00</strong>
          </div>
          <h4>Payment Summary</h4>
          <div>
            <div>
              <span>Est. Subtotal</span>
              <strong>$5.00</strong>
            </div>
            <div>
              <span>Tax (17.00%)</span>
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
        <div>
          <div>
            <input type="checkbox" name="" id="" />
            By checking this box, you agree to our Terms and Conditions, Privacy
            Policy, and Disclaimer.
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
