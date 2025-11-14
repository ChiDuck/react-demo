import { useEffect } from "react";
import "../styles/Modal.scss";

export default function LoginModal({ setIsLoginVisible, isLoginVisible }) {
  useEffect(() => {
    if (isLoginVisible) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoginVisible]);
  return (
    <>
      <div
        className={`overlay ${isLoginVisible ? "open" : ""}`}
        style={{ zIndex: 10 }}
      ></div>
      <div className={`modal-wrapper ${isLoginVisible ? "open" : ""}`}>
        <div className={`modal ${isLoginVisible ? "open" : ""}`}>
          <button
            className="close-button"
            onClick={() => setIsLoginVisible(false)}
          >
            &#10006;
          </button>
          <img src="logo/logo2.svg" alt="React Logo" />
          <h2>Log In</h2>
          <div className="modal-content">
            <div style={{ textAlign: "center" }}>
              <p>Welcome!</p>
              <p>Please enter your details.</p>
            </div>
            <div className="info">
              <button className="phone-number">Phone number</button>
              <button className="email-address">Email Address</button>
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
            />
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
            <span>
              Don't have an account? <a href="#">Sign up</a>
            </span>
          </div>

          <button className="next-button">Next</button>
          <div className="divider">
            <span></span>
            <p>Or</p>
          </div>
          <button className="facebook-login-button">
            <img src="social-icon/facebook.svg" />
            Continues with Facebook
          </button>
          <button className="google-login-button">
            <img src="social-icon/google.svg" />
            Continues with Google
          </button>
        </div>
      </div>
    </>
  );
}
