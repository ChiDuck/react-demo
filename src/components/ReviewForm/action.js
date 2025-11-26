import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIDU0MDUiLCJpZCI6IjRkMzhhZmMwLWFjODMtNDg4NC1iOGQzLWUwOGIzYTVkMWFkNCIsInJvbGUiOiJ1c2VyIiwiYWN0aXZlIjp0cnVlLCJkYmlkIjoiYzJmZmIxNWUiLCJleHAiOjE3NjQxMzAzNzZ9.66-BrG54Sq0KUyK-DnR7oYfr0nWT759erzyq-Emy0x4";

export async function action({ request }) {
    const formData = await request.formData();
    const salonid = formData.get("salonid");
    const headline = formData.get("headline");
    const review = formData.get("review");
    const star = Number(formData.get("star"));
    const files = formData.get("photos");

    const payload = {
        salonid,
        content: JSON.stringify({ headline, review }),
        star,
    };

    console.log(payload);

    const res = await fetch(`${API_URL}salon/cmd?c=AddSalonReview`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify(payload),
    });

    const json = res.json();
    console.log(json);
    if (!res.ok) {
        return { error: "Something went wrong." };
    }

    //Upload photos to server
    const uploadData = new FormData();
    uploadData.append("idsalon", salonid);
    uploadData.append("idreview", json.new_id);
    files.forEach((f, i) => { uploadData.append("file[]", f) });

    const uploadPic = await fetch(`${API_URL}salon/cmd?c=UploadPictureSalonReview`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: uploadData,
    });

    const uploadjson = uploadPic.json();
    if (uploadjson.data.status != 0) return { error: "Upload photo failed." }
    return redirect(`/viewreview/${salonid}`);
}
