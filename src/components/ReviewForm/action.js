import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIDU0MDUiLCJpZCI6IjRkMzhhZmMwLWFjODMtNDg4NC1iOGQzLWUwOGIzYTVkMWFkNCIsInJvbGUiOiJ1c2VyIiwiYWN0aXZlIjp0cnVlLCJkYmlkIjoiNzdmZWE4MmIiLCJleHAiOjE3NjM2MzcyMTF9.XNizbJY1mc-1Ue4hHjSUrpVUnD4cOw9ZTfwgjJUJFkI";

export async function action({ request }) {
    const formData = await request.formData();
    const salonid = formData.get("salonid");
    const headline = formData.get("headline");
    const review = formData.get("review");
    const star = Number(formData.get("star"));

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
    console.log(res.json());
    if (!res.ok) {
        return { error: "Something went wrong." };
    }

    return redirect();
}
