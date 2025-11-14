import { useEffect } from "react";
import "../styles/Modal.scss";

export default function SignUpModal({ setIsSignupVisible, isSignupVisible }) {
  useEffect(() => {
    if (isSignupVisible) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSignupVisible]);
  return (
    <>
      <div
        className={`overlay ${isSignupVisible ? "open" : ""}`}
        style={{ zIndex: 10 }}
      ></div>
      <div className={`modal-wrapper ${isSignupVisible ? "open" : ""}`}>
        <div className={`modal ${isSignupVisible ? "open" : ""}`}>
          <button
            className="close-button"
            onClick={() => setIsSignupVisible(false)}
          >
            &#10006;
          </button>
          <img src="logo/logo2.svg" alt="React Logo" />
          <h2>Sign Up</h2>
          <p>Already have an account?</p>
          <a href="#">Sign in</a>
          <div className="info">
            <button className="phone-number">Phone number</button>
            <button className="email-address">Email Address</button>
          </div>
          <input
            type="text"
            placeholder="Phone Number"
            className="login-input"
          />
          <button className="next-button">Continue</button>
        </div>
      </div>
    </>
  );
}
