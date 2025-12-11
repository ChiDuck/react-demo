import { useEffect, useState } from "react";
import { postSalonAPI } from "../../../config/apiCalls";
import css from "./AccountSetting.module.scss";

export default function ChangePassword() {
  const [show, setShow] = useState({
    pass1: false,
    pass2: false,
    pass3: false,
  });
  const [values, setValues] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const toggle = (key) => setShow((s) => ({ ...s, [key]: !s[key] }));
  const onChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: "" }));
  };

  const validate = () => {
    const next = { current: "", newPass: "", confirm: "" };
    if (!values.current.trim()) next.current = "Current password is required.";
    if (!values.newPass.trim()) next.newPass = "New password is required.";
    if (!values.confirm.trim())
      next.confirm = "Please confirm your new password.";
    if (!next.newPass && !next.confirm && values.newPass !== values.confirm) {
      next.confirm = "Passwords do not match.";
    }
    setErrors(next);
    return !next.current && !next.newPass && !next.confirm;
  };

  const updatePasswd = async () => {
    const payload = new FormData();
    payload.append("newpwd", values.newPass);
    payload.append("oldpwd", values.current);

    const res = await postSalonAPI({
      c: "changepwd",
      user: true,
      body: payload,
    });

    if (res.error !== "") {
      console.log(res.error);
      setErrors({ ...errors, current: res.error });
      return;
    }
  };

  const handleSubmit = () => {
    if (!validate()) {
      // focus first invalid input
      const order = ["current", "newPass", "confirm"];
      for (const key of order) {
        if (
          errors[key] ||
          (key === "current" && !values.current.trim()) ||
          (key === "newPass" && !values.newPass.trim()) ||
          (key === "confirm" &&
            (!values.confirm.trim() || values.newPass !== values.confirm))
        ) {
          const el = document.querySelector(`input[name="${key}"]`);
          el?.focus();
          break;
        }
      }
      return;
    }
    updatePasswd();

    console.log("submit", values);
  };

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  return (
    <div className={css.passwd}>
      <label>
        <span>Current Password</span>
        <div className={errors.current ? css.invalid : ""}>
          <input
            name="current"
            type={show.pass1 ? "text" : "password"}
            value={values.current}
            onChange={onChange("current")}
            aria-invalid={!!errors.current}
            aria-describedby={errors.current ? "err-current" : undefined}
          />
          <button
            type="button"
            onClick={() => toggle("pass1")}
            aria-label="Toggle current password"
          >
            <i
              className={
                show.pass1 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }
            />
          </button>
        </div>
        {errors.current && (
          <span id="err-current" className={css.err}>
            {errors.current}
          </span>
        )}
      </label>

      <label>
        <span>New Password</span>
        <div className={errors.newPass ? css.invalid : ""}>
          <input
            name="newPass"
            type={show.pass2 ? "text" : "password"}
            value={values.newPass}
            onChange={onChange("newPass")}
            aria-invalid={!!errors.newPass}
            aria-describedby={errors.newPass ? "err-new" : undefined}
          />
          <button
            type="button"
            onClick={() => toggle("pass2")}
            aria-label="Toggle new password"
          >
            <i
              className={
                show.pass2 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }
            />
          </button>
        </div>
        {errors.newPass && (
          <span id="err-new" className={css.err}>
            {errors.newPass}
          </span>
        )}
      </label>

      <label>
        <span>Confirm New Password</span>
        <div className={errors.confirm ? css.invalid : ""}>
          <input
            name="confirm"
            type={show.pass3 ? "text" : "password"}
            value={values.confirm}
            onChange={onChange("confirm")}
            aria-invalid={!!errors.confirm}
            aria-describedby={errors.confirm ? "err-confirm" : undefined}
          />
          <button
            type="button"
            onClick={() => toggle("pass3")}
            aria-label="Toggle confirm password"
          >
            <i
              className={
                show.pass3 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }
            />
          </button>
        </div>
        {errors.confirm && (
          <span id="err-confirm" className={css.err}>
            {errors.confirm}
          </span>
        )}
      </label>

      <button type="button" onClick={handleSubmit}>
        Change Password
      </button>
    </div>
  );
}
