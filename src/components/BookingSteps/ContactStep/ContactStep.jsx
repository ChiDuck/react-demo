import { useEffect, useState } from "react";
import { loadUserFromStorage } from "../../../pages/localStorage";
import "../BookingSteps.scss";

export default function ContactStep({ state, dispatch }) {
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const parser = JSON.parse(state.inforUser);

  useEffect(() => {
    if (state.inforUser === null) {
      const user = loadUserFromStorage();
      if (!user) return;
      const fn = user.firstname || "";
      const ln = user.lastname || "";
      dispatch({
        type: "SET_CONTACT",
        payload: JSON.stringify({
          name: [fn, ln].filter(Boolean).join(" ") || "",
          phone: user.phonenumber || "",
          email: user.email || "",
        }),
      });
    } else {
      validateField("fullName", parser?.name);
      validateField("phoneNumber", parser?.phone);
      validateField("email", parser?.email);
    }
  }, []);

  function validateField(field, value) {
    let msg = "";
    const v = (value || "").toString().trim();
    if (field === "fullName") {
      if (v.length === 0) msg = "This field is required";
    }
    if (field === "phoneNumber") {
      const digits = v.replace(/\D/g, "");
      if (digits.length === 0) {
        msg = "Phone number is required";
      } else if (digits.length < 9 || digits.length > 12) {
        msg = "Phone number is invalid";
      }
    }
    if (field === "email") {
      if (v.length > 0) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(v)) msg = "Enter a valid email address";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: msg }));
    return msg === "";
  }

  return (
    <>
      <div className="text-center">
        <h3>Contact Information</h3>
        <p>Please provide your contact details for the booking.</p>
      </div>
      <div className="contact-info">
        <h4>Primary Contact</h4>

        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={parser?.name ?? ""}
          onChange={(e) => {
            dispatch({
              type: "SET_CONTACT",
              payload: JSON.stringify({
                name: e.target.value,
                phone: parser?.phone ?? "",
                email: parser?.email ?? "",
              }),
            });
            validateField("fullName", e.target.value);
          }}
        />
        {errors.fullName && (
          <span className="error-text">{errors.fullName}</span>
        )}

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          max={15}
          value={parser?.phone ?? ""}
          onChange={(e) => {
            dispatch({
              type: "SET_CONTACT",
              payload: JSON.stringify({
                name: parser?.name ?? "",
                phone: e.target.value,
                email: parser?.email ?? "",
              }),
            });
            validateField("phoneNumber", e.target.value);
          }}
        />
        {errors.phoneNumber && (
          <span className="error-text">{errors.phoneNumber}</span>
        )}

        <label htmlFor="email">
          Email Address <span>(Optional)</span>
        </label>
        <input
          id="email"
          type="text"
          value={parser?.email ?? ""}
          onChange={(e) => {
            dispatch({
              type: "SET_CONTACT",
              payload: JSON.stringify({
                name: parser?.name ?? "",
                phone: parser?.phone ?? "",
                email: e.target.value,
              }),
            });
            validateField("email", e.target.value);
          }}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>
    </>
  );
}
