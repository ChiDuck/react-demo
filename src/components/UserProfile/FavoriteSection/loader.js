import { getSalonAPI } from "../../../config/apiCalls";

export async function userFavoriteLoader({ request }) {

    const [salons, services] = await Promise.all([

        getSalonAPI({
            s: "GetUserSalonFavourite",
            z: 8,
            salon: true,
            signal: request.signal
        }),

        getSalonAPI({
            s: "GetUserServiceFavourite",
            z: 8,
            user: true,
            signal: request.signal
        }),])

    console.log({ salons, services });
    return { salons, services };
}