import { redirect } from "react-router-dom";
import { postSalonAPI } from "../../config/apiCalls";

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

    const res = await postSalonAPI({
        c: "AddSalonReview",
        body: JSON.stringify(payload),
    });

    if (res.error !== "") {
        console.log(res.error);
        return
    }

    //Upload photos to server
    if (files.length !== 0) {
        const uploadData = new FormData();
        uploadData.append("idsalon", salonid);
        uploadData.append("idreview", res.new_id);
        files.forEach((f) => uploadData.append("file[]", f));
        console.log(uploadData);

        const uploadPic = await postSalonAPI({
            c: "UploadPictureSalonReview",
            body: uploadData,
        });

        if (!uploadPic.ok)
            return { error: "Something went wrong." };

        const uploadjson = await uploadPic.data;
        console.log(uploadjson);
        if (uploadjson.status != 0) return { error: "Upload photo failed." }
    }
    return redirect(`/viewreview/${salonid}`);
}
