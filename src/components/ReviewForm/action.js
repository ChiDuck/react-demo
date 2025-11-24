import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTlRQIDU0MDUiLCJpZCI6IjRkMzhhZmMwLWFjODMtNDg4NC1iOGQzLWUwOGIzYTVkMWFkNCIsInJvbGUiOiJ1c2VyIiwiYWN0aXZlIjp0cnVlLCJkYmlkIjoiMWU1Mjg1MDkiLCJleHAiOjE3NjM3MTc4MDJ9.8ctZwa6ziFzdtmWiF-PeFqQE4B-17DqedvtATQ1hiRo";

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

    return redirect(`/viewreview/${salonid}`);
}
