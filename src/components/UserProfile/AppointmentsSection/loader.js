import { getSalonAPI } from "../../../config/apiCalls";

export async function userAppointmentLoader({ request }) {
    const appointments = await
        getSalonAPI({
            s: "GetUserAppointment",
            user: true,
            sort: "",
            p: 1,
            z: 5,
            signal: request.signal
        })

    console.log(appointments);
    return appointments;
}