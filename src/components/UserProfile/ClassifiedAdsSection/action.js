import { postSalonAPI } from "../../../config/apiCalls";

export async function addClassifiedAds({ request }) {
    const formData = await request.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const city = formData.get("city");
    const type = formData.get("type");
    const street = formData.get("street");
    const desc = formData.get("desc");
    const title = formData.get("title");
    const state = formData.get("state");
    const zip = formData.get("zip");
    const suite = formData.get("suite");
    const files = formData.getAll("photos");

    console.log("FILES FROM FORM:");
    files.forEach(f => {
        console.log({
            name: f.name,
            size: f.size,
            type: f.type,
            isFile: f instanceof File,
        });
    });

    const payload = new FormData();
    payload.append("idsalon", "");
    payload.append("description", desc);
    payload.append("listingtype", Number(type));
    payload.append("contactname", name);
    payload.append("title", title);
    payload.append("contactnumber", phone);
    payload.append("contactcountryphone", "+1");
    payload.append("contactemail", email);
    payload.append("street", street);
    payload.append("city", city);
    payload.append("state", state);
    payload.append("zip", zip);
    payload.append("suite", suite);
    files.forEach(file => {
        payload.append("file[]", file);
    });

    for (const [k, v] of payload.entries()) {
        console.log(k, v);
    }

    const res = await postSalonAPI({
        c: "CreateRecruitment",
        user: true,
        body: payload,
    });

    if (res.error !== "") {
        console.log(res.error);
        return
    }

    return;
}
