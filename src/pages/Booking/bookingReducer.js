export const BOOKING_STEPS = {
    guest: 1,
    services: 2,
    preferences: 3,
    date: 4,
    time: 5,
    contact: 6,
    confirm: 7
}

export const initialState = {
    step: BOOKING_STEPS.guest,
    inforUser: null,
    selectedService: [],
    selectedTechnician: [],
    guests: 1,
    selectedDate: null,
    selectedTime: null,
    tax: 0,
    formatselecteddate: null,
};

function buildSavePayload({ salonid, state, sessionKey }) {
    return {
        salonid,
        key: sessionKey,
        content: JSON.stringify({
            inforUser: state.inforUser,
            selectedService: state.selectedService,
            selectedTechnician: state.selectedTechnician,
            guests: state.guests,
            selectedDate: state.selectedDate,
            selectedTime: state.selectedTime,
            tax: state.tax,
            step: state.step,
            formatselecteddate: state.formatselecteddate,
        }),
    };
}


export function bookingReducer(state, action) {
    switch (action.type) {
        case "SET_GUESTS":
            return { ...state, guests: action.payload };

        case "SET_SERVICES":
            return { ...state, selectedService: action.payload.srv, tax: action.payload.tax };

        case "SET_PREFERENCES":
            return {
                ...state,
                selectedTechnician: action.payload,
                selectedDate: null,
                formatselecteddate: null
            };

        case "SET_DATE":
            return {
                ...state,
                selectedDate: action.payload.date,
                formatselecteddate: action.payload.formatted,
                selectedTime: null,
            };

        case "SET_TIME":
            return { ...state, selectedTime: action.payload };

        case "SET_CONTACT":
            return { ...state, inforUser: action.payload };

        case "SET_CONFIRM":
            return { ...state, confirm: action.payload };

        case "NEXT_STEP":
            return { ...state, step: state.step + 1 };

        case "PREV_STEP":
            return { ...state, step: state.step - 1 };

        case "HYDRATE_FROM_API":
            return {
                ...state,
                ...action.payload,
                step: action.payload.step ?? state.step,
            };
        default:
            return state;
    }
}