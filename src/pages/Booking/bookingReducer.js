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
    guests: 0,
    selectedService: [],
    selectedTechnician: [],
    selectedDate: null,
    selectedTime: null,
    inforUser: null,
    tax: 0,
    formatselecteddate: null
}

export function bookingReducer(state, action) {
    switch (action.type) {
        case "SET_GUEST":
            return { ...state, guest: action.payload };

        case "SET_SERVICES":
            return { ...state, selectedService: action.payload };

        case "SET_PREFERENCES":
            return { ...state, preferences: action.payload };

        case "SET_DATE":
            return { ...state, date: action.payload };

        case "SET_TIME":
            return { ...state, time: action.payload };

        case "SET_CONTACT":
            return { ...state, contact: action.payload };

        case "SET_CONFIRM":
            return { ...state, confirm: action.payload };

        case "NEXT_STEP":
            return { ...state, step: state.step + 1 };

        case "PREV_STEP":
            return { ...state, step: state.step - 1 };

        default:
            return state;
    }
}