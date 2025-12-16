import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { getSalonAPI } from "../../../config/apiCalls";
import css from "./ClassifiedAds.module.scss";
import { useDebouncedValue } from "./useDebouncedValue";

export default function ClassifiedAdsModal({ open, setOpen }) {
  const [type, setType] = useState(0);
  const [files, setFiles] = useState([]);
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [ctname, setCtname] = useState("");
  const [title, setTitle] = useState("");
  const [street, setStreet] = useState("");
  const debouncedZip = useDebouncedValue(zip, 700);
  const abortRef = useRef(null);
  const fileInputRef = useRef(null);
  const fetcher = useFetcher();
  const MAX_PHOTOS = 3;

  const [errors, setErrors] = useState({
    mailErr: "",
    phoneErr: "",
    nameErr: "",
    streetErr: "",
    photoErr: "",
    titleErr: "",
    zipErr: "",
  });
  const hasErr =
    Object.values(errors).some((err) => err !== "") ||
    phone === "" ||
    zip === "" ||
    ctname === "" ||
    street === "" ||
    title === "";

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/bmp",
    "image/tiff",
    "image/webp",
  ];
  const fileKey = (file) => `${file.name}_${file.size}_${file.lastModified}`;

  const handleSelect = (e) => {
    let err = "";
    const selected = Array.from(e.target.files);

    if (files.length >= MAX_PHOTOS) {
      setErrors((prev) => ({
        ...prev,
        photoErr: `You can only upload a maximum of ${MAX_PHOTOS} files.`,
      }));
      e.target.value = "";
      return;
    }

    if (files.length + selected.length > MAX_PHOTOS) {
      err = `You can only upload a maximum of ${MAX_PHOTOS} files.`;
      selected.length = MAX_FILES - files.length;
    }

    const existingKeys = new Set(files.map((f) => fileKey(f)));
    const pickedKeys = new Set();

    const validFiles = selected.filter((file) => {
      const formatOk = allowedTypes.includes(file.type);

      const key = fileKey(file);
      const dupOk = existingKeys.has(key) || pickedKeys.has(key);
      if (!formatOk) {
        err =
          "Some file couldn't be uploaded. Use an image in one of these formats: .jpg, .jpeg, .png, .bmp, .tif, or .webp";
      }
      if (dupOk) {
        err = "There were duplicated files. Please choose different files.";
      }
      return formatOk && !dupOk;
    });

    setErrors((prev) => ({
      ...prev,
      photoErr: err,
    }));

    const newFiles = [...files, ...validFiles];
    const dt = new DataTransfer();
    newFiles.forEach((file) => dt.items.add(file));
    if (validFiles.length > 0) setFiles((prev) => [...prev, ...validFiles]);
    e.target.files = dt.files;
    console.log(dt.files);
  };

  useEffect(() => {
    if (!debouncedZip) {
      setErrors((prev) => ({
        ...prev,
        zipErr: "This field cannot be empty",
      }));

      if (abortRef.current) abortRef.current.abort();
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      const res = await getSalonAPI({
        s: "GetAutoFillByZipcode",
        zip: debouncedZip,
        salon: true,
        signal: controller.signal,
      });

      if (res.error !== "") {
        setCity("");
        setState("");
        setErrors((prev) => ({ ...prev, zipErr: res.error }));
        console.log(res.error);
        return;
      }

      setCity(res.data.city);
      setState(res.data.stateid);
      setErrors((prev) => ({ ...prev, zipErr: "" }));
    })();
    return () => {
      controller.abort();
    };
  }, [debouncedZip]);

  function formatPhone(value) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  const handlePhone = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);

    const digitCount = formatted.replace(/\D/g, "").length;

    if (digitCount === 0) {
      setErrors((prev) => ({
        ...prev,
        phoneErr: "* This field cannot be empty",
      }));
    } else if (digitCount < 9 || digitCount > 10) {
      setErrors((prev) => ({ ...prev, phoneErr: "* Invalid phone" }));
    } else {
      setErrors((prev) => ({ ...prev, phoneErr: "" }));
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (isValidEmail(value) || !value) {
      setErrors((prev) => ({ ...prev, mailErr: "" }));
    } else {
      setErrors((prev) => ({ ...prev, mailErr: "* Email Invalid" }));
    }
  };

  function handleEmpty({ e, errType }) {
    if (!e.target.value) {
      setErrors((prev) => ({
        ...prev,
        [errType]: "* This field cannot be empty",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [errType]: "" }));
    }
  }

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={open ? `${css.overlay} ${css.active}` : css.overlay}>
      <fetcher.Form
        method="post"
        encType="multipart/form-data"
        className={css.modal}
      >
        <div>
          <button
            type="button"
            style={{ all: "unset", cursor: "pointer" }}
            onClick={() => setOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className={css.switch}>
          <div className={type === 1 ? css.buysell : ""}>
            <div></div>
            <div>
              <div onClick={() => setType(0)}>
                <strong className={type === 0 ? css.white : ""}>
                  Salon Jobs Listing
                </strong>
              </div>
              <div onClick={() => setType(1)}>
                <strong className={type === 1 ? css.white : ""}>
                  Salon - Buy & Sell
                </strong>
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" name="type" value={type} />
        <div className={css.imgBlock}>
          {files.length > 0 && (
            <div className={css.imgList}>
              {files.map((src, index) => (
                <div className={css.imgItem} key={index}>
                  <img src={URL.createObjectURL(src)} alt={src.name} />
                  <button onClick={() => removeImage(index)}>×</button>
                </div>
              ))}
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            name="photos"
            multiple
            accept=".jpg, .jpeg, .png, .bmp, .tif, .tiff, .webp"
            style={{ display: "none" }}
            onChange={handleSelect}
          />
          <button
            type="button"
            className={css.upload}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <img src="/icon/upload.svg" alt="" />
            <span>Upload photo for listing</span>
          </button>
        </div>
        {errors.photoErr && <span className={css.err}>{errors.photoErr}</span>}
        <div className={css.row}>
          <div>
            <span>
              Contact Name <span>*</span>
            </span>
            <input
              name="name"
              type="text"
              onChange={(e) => {
                handleEmpty({ e, errType: "nameErr" });
                setCtname(e.target.value);
              }}
            />
            {errors.nameErr && (
              <span className={css.err}>{errors.nameErr}</span>
            )}
          </div>
          <div>
            <span>
              Contact Number <span>*</span>
            </span>
            <div className={css.phoneInput}>
              <button type="button">
                <span>+1</span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.77734 1.3125L5.16797 5.03125C5.03125 5.19531 4.83984 5.25 4.64844 5.25C4.42969 5.25 4.23828 5.19531 4.10156 5.03125L0.492188 1.3125C0 0.820312 0.355469 0 1.01172 0H8.25781C8.91406 0 9.26953 0.820312 8.77734 1.3125Z"
                    fill="#777777"
                  />
                </svg>
              </button>
              <input
                name="phone"
                type="tel"
                placeholder="(123) 456-7899"
                inputMode="numeric"
                value={phone}
                maxLength={14}
                onChange={handlePhone}
              />
            </div>
            {errors.phoneErr && (
              <span className={css.err}>{errors.phoneErr}</span>
            )}
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>Email Address</span>
            <input
              name="email"
              type="text"
              onChange={handleEmail}
              value={email}
            />
            {errors.mailErr && (
              <span className={css.err}>{errors.mailErr}</span>
            )}
          </div>
          <div>
            <span>
              Street <span>*</span>
            </span>
            <input
              name="street"
              type="text"
              onChange={(e) => {
                handleEmpty({ e, errType: "streetErr" });
                setStreet(e.target.value);
              }}
            />
            {errors.streetErr && (
              <span className={css.err}>{errors.streetErr}</span>
            )}
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>Unit, Suite</span>
            <input name="suite" type="text" />
          </div>
          <div>
            <span>
              Zip Code <span>*</span>
            </span>
            <input
              name="zip"
              type="number"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            {errors.zipErr && (
              <span className={css.err}>* {errors.zipErr}</span>
            )}
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>State</span>
            <input name="state" type="text" readOnly value={state} />
          </div>
          <div>
            <span>City</span>
            <input name="city" type="text" readOnly value={city} />
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>
              Title <span>*</span>
            </span>
            <input
              name="title"
              type="text"
              maxLength={30}
              onChange={(e) => {
                handleEmpty({ e, errType: "titleErr" });
                setTitle(e.target.value);
              }}
            />
            <div>
              {errors.titleErr && (
                <span className={css.err}>{errors.titleErr}</span>
              )}
              <span>Limit: 30 characters</span>
            </div>
          </div>
        </div>
        <div className={css.row}>
          <div>
            <span>Description</span>
            <textarea name="desc" id="" maxLength={250}></textarea>
            <div>
              <span>Limit: 250 characters</span>
            </div>
          </div>
        </div>
        <div className={css.row}>
          <button
            type="submit"
            className={css.uploadAd}
            disabled={hasErr}
            onClick={() => setOpen(false)}
          >
            Upload Ad
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
