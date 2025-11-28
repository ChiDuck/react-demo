import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIDU0MDUiLCJpZCI6IjRkMzhhZmMwLWFjODMtNDg4NC1iOGQzLWUwOGIzYTVkMWFkNCIsInJvbGUiOiJ1c2VyIiwiYWN0aXZlIjp0cnVlLCJkYmlkIjoiYmRhMDVhMDQiLCJleHAiOjE3NjQzMjc2NTJ9.kitauzdWohmHcvKB69pFCmrcgogivRr36QxoGRZJl9M";

export async function action({ request }) {
    const formData = await request.formData();
    const salonid = formData.get("salonid");
    const headline = formData.get("headline");
    const review = formData.get("review");
    const star = Number(formData.get("star"));
    const files = formData.getAll("photos");

    console.log(files);

    const payload = {
        salonid,
        content: JSON.stringify({ headline, review }),
        star,
    };

    const res = await fetch(`${API_URL}salon/cmd?c=AddSalonReview`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify(payload),
    });

    const json = await res.json();
    console.log(json);
    if (!res.ok)
        return { error: "Something went wrong." };

    //Upload photos to server
    if (files.length !== 0) {
        const uploadData = new FormData();
        uploadData.append("idsalon", salonid);
        uploadData.append("idreview", json.new_id);
        files.forEach((f) => uploadData.append("file[]", f));
        console.log(uploadData);

        const uploadPic = await fetch(`${API_URL}salon/cmd?c=UploadPictureSalonReview`, {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: uploadData,
        });
        if (!uploadPic.ok)
            return { error: "Something went wrong." };

        const uploadjson = await uploadPic.json();
        console.log(uploadjson);
        if (uploadjson.data.status != 0) return { error: "Upload photo failed." }
    }
    return redirect(`/viewreview/${salonid}`);
}
