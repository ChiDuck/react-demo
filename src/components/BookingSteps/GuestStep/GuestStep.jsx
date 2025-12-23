import "../BookingSteps.scss";
export default function GuestStep({ state, dispatch, maxGuest }) {
  return (
    <>
      <div className="text-center">
        <h2>Welcome</h2>
        <p>How many guests will be joining us today?</p>
      </div>
      <div className="guest-counter">
        <h3>Number of Guest</h3>
        <h1>{state.guests}</h1>
        <div>
          <button
            disabled={state.guests === 1}
            onClick={() =>
              dispatch({ type: "SET_GUESTS", payload: state.guests - 1 })
            }
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <button
            disabled={state.guests === maxGuest}
            onClick={() =>
              dispatch({ type: "SET_GUESTS", payload: state.guests + 1 })
            }
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
}
