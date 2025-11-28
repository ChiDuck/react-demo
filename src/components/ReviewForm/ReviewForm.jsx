import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
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
      }}
    ></i>
  ));
}

export default function ReviewForm({ salonid }) {
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({
    headlineErr: "",
    reviewErr: "",
    formatErr: "",
    dupErr: "",
    maxErr: "",
  });
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const newErrors = {};
  const MAX_PHOTOS = 9;

  const validate = () => {
    if (!headline.trim()) newErrors.headlineErr = "Headline is required";
    if (!review.trim()) newErrors.reviewErr = "Review is required";
    setErrors((prev) => ({
      ...prev,
      headlineErr: newErrors.headlineErr,
      reviewErr: newErrors.reviewErr,
    }));
    return Object.keys(newErrors).length === 0;
  };

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/bmp",
    "image/tiff",
    "image/webp",
  ];

  const fileKey = (file) => `${file.name}_${file.size}_${file.lastModified}`;

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files);

    if (files.length >= MAX_PHOTOS) {
      newErrors.maxErr = "You can only upload a maximum of 9 files.";
      setErrors((prev) => ({
        ...prev,
        maxErr: newErrors.maxErr,
      }));
      e.target.value = "";
      return;
    }

    if (files.length + selected.length > MAX_PHOTOS) {
      newErrors.maxErr = "You can only upload a maximum of 9 files.";
      setErrors((prev) => ({
        ...prev,
        maxErr: newErrors.maxErr,
      }));
      selected.length = MAX_FILES - files.length;
    }

    const existingKeys = new Set(files.map((f) => fileKey(f)));
    const pickedKeys = new Set();

    const validFiles = selected.filter((file) => {
      const formatOk = allowedTypes.includes(file.type);

      const key = fileKey(file);
      const dupOk = existingKeys.has(key) || pickedKeys.has(key);
      if (!formatOk) {
        newErrors.formatErr =
          "Some file couldn't be uploaded. Use an image in one of these formats: .jpg, .jpeg, .png, .bmp, .tif, or .webp";
      }
      if (dupOk) {
        newErrors.dupErr =
          "There were duplicated files. Please choose different files.";
      }
      return formatOk && !dupOk;
    });

    setErrors((prev) => ({
      ...prev,
      dupErr: newErrors.dupErr,
      formatErr: newErrors.formatErr,
    }));

    if (validFiles.length > 0) setFiles((prev) => [...prev, ...validFiles]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append("star", Number(rating));
    formData.append("salonid", salonid ?? "");
    formData.append("headline", headline ?? "");
    formData.append("review", review ?? "");

    files.forEach((file) => formData.append("photos", file));

    // submit to the current route's action (or provide 'action' option)
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      // action: "/path-if-you-want-to-post-to-different-route"
    });
  };

  return (
    <fetcher.Form
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
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
        {errors.headlineErr && (
          <div style={{ color: "red", marginTop: "4px", fontSize: "12px" }}>
            {errors.headlineErr}
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
        {errors.reviewErr && (
          <div style={{ color: "red", marginTop: "4px", fontSize: "12px" }}>
            {errors.reviewErr}
          </div>
        )}
      </div>
      <div className={style.imgBlock}>
        <input
          ref={fileInputRef}
          type="file"
          name="photos"
          accept=".jpg, .jpeg, .png, .bmp, .tif, .tiff, .webp"
          multiple
          style={{ display: "none" }}
          onChange={handleSelect}
        />
        {files.length > 0 && (
          <div className={style.imgList}>
            {files.map((src, index) => (
              <div className={style.imgItem} key={index}>
                <img src={URL.createObjectURL(src)} alt={src.name} />
                <button onClick={() => removeImage(index)}>×</button>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          className={style.upload}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <img src="/icon/upload.svg" alt="" />
          <span>Upload Photo</span>
        </button>
      </div>
      {(errors.maxErr || errors.formatErr || errors.dupErr) && (
        <div className={style.fileError}>
          {errors.maxErr || errors.formatErr || errors.dupErr}
          <div>
            <button
              type="button"
              onClick={() =>
                setErrors((prev) => ({
                  ...prev,
                  formatErr: "",
                  maxErr: "",
                  dupErr: "",
                }))
              }
            >
              X
            </button>
          </div>
        </div>
      )}
      <button className={style.post} type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            Please wait...
            <i className={`fa-solid fa-spinner ${style.spinner}`}></i>
          </>
        ) : (
          "Post Review"
        )}
      </button>
    </fetcher.Form>
  );
}
