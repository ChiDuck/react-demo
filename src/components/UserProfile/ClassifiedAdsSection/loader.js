import { getSalonAPI } from "../../../config/apiCalls";

export async function classifiedAdsLoader({ request }) {

    const [ads1, ads2] = await Promise.all(

        [getSalonAPI({
            s: "GetUserRecruitment",
            listingtype: 0,
            user: true,
            signal: request.signal
        }),
        getSalonAPI({
            s: "GetUserRecruitment",
            listingtype: 1,
            user: true,
            signal: request.signal
        }),
        ]);

    console.log({ ads1, ads2 });
    return { ads1, ads2 };
}