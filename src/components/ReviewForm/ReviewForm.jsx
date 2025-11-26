import { useState, useRef } from "react";
import { Form } from "react-router-dom";
import style from "./ReviewForm.module.scss";

function StarRating({ maxStars = 5, onChange }) {
  const [selected, setSelected] = useState(maxStars);
  const [hovered, setHovered] = useState(0);
  const handleClick = (index) => {
    setSelected(index);
    if (onChange) onChange(index); // return the number to parent
  };

  return Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
    <i
      key={star}
      className={`fa-solid fa-star ${style.rating}`}
      onClick={() => handleClick(star)}
      onMouseEnter={() => setHovered(star)}
      onMouseLeave={() => setHovered(0)}
      style={{
        color: star <= (hovered || selected) ? "#ffb800" : "rgb(170, 170, 170)",
        fontSize: "24px",
        userSelect: "none",
      }}
    ></i>
  ));
}

export default function ReviewForm({ salonid }) {
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const allowedExt = ["jpg", "jpeg", "png", "bmp", "tif", "webp"];

  function validateFiles(files) {
    const invalid = [];
    const valid = [];

    Array.from(files).forEach((f) => {
      const name = f.name || "";
      const ext = name.split(".").pop().toLowerCase();
      const mime = f.type || "";

      // check either mime or extension
      const mimeOk = /image\/(jpeg|jpg|png|bmp|tiff|webp)/.test(mime);
      const extOk = allowedExt.includes(ext);

      if (mimeOk || extOk) valid.push(f);
      else invalid.push(name || "(unknown)");
    });

    return { valid, invalid };
  }

  const validate = () => {
    const newErrors = {};
    if (!headline.trim()) newErrors.headline = "Headline is required";
    if (!review.trim()) newErrors.review = "Review is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <Form
      method="post"
      onSubmit={(e) => {
        if (!validate()) e.preventDefault(); // block submission if invalid
      }}
      className={style.reviewForm}
    >
      <div>
        <p>Select Your Rating</p>
        <StarRating onChange={(num) => setRating(num)} />
      </div>
      <input type="hidden" name="star" value={rating} />
      <input type="hidden" name="salonid" value={salonid} />
      <div>
        <p>Add a Headline</p>
        <input
          type="text"
          name="headline"
          onChange={(e) => {
            setHeadline(e.target.value);
            validate();
          }}
          placeholder="What's most important to know?"
        />
        {errors.headline && (
          <div style={{ color: "red", marginTop: "4px", fontSize: "12px" }}>
            {errors.headline}
          </div>
        )}
      </div>
      <div>
        <p>Write Your Review</p>
        <textarea
          onChange={(e) => {
            setReview(e.target.value);
            validate();
          }}
          name="review"
          rows="5"
          placeholder="What did you like or dislike about service/ products?"
        ></textarea>
        {errors.review && (
          <div style={{ color: "red", marginTop: "4px", fontSize: "12px" }}>
            {errors.review}
          </div>
        )}
      </div>
      <div>
        <input
          ref={fileInputRef}
          type="file"
          name="photos"
          accept=".jpg,.jpeg,.png,.bmp,.tif,.tiff,.webp,image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            const { valid, invalid } = validateFiles(e.target.files);

            if (invalid.length) {
              // alert user which files were rejected
              window.alert(
                `These files have unsupported format and were ignored:\n${invalid.join(", ")}`
              );
            }

            // keep valid files; if none valid, clear the input
            if (valid.length === 0) {
              e.target.value = null;
              setSelectedFiles([]);
              return;
            }

            // programmatically set the input's files to the valid files only
            try {
              const dt = new DataTransfer();
              valid.forEach((f) => dt.items.add(f));
              e.target.files = dt.files;
            } catch (err) {
              // setting files may not be supported in some browsers; fallback
            }

            setSelectedFiles(valid.map((f) => f.name));
          }}
        />

        <button
          type="button"
          className={style.upload}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <img src="/icon/upload.svg" alt="" />
          <span>Upload Photo</span>
        </button>

        {selectedFiles.length > 0 && (
          <div style={{ marginTop: 8, fontSize: 13 }}>
            Selected ({selectedFiles.length}): {selectedFiles.join(", ")}
          </div>
        )}
      </div>
      <button className={style.post} type="submit">
        Post Review
      </button>
    </Form>
  );
}
