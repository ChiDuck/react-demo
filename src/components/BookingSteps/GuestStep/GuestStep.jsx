import "../BookingSteps.scss";
export default function GuestStep({
  state,
  dispatch,
  guest,
  setGuest,
  maxGuest,
}) {
  return (
    <>
      <div className="text-center">
        <h2>Welcome</h2>
        <p>How many guests will be joining us today?</p>
      </div>
      <div className="guest-counter">
        <h3>Number of guest</h3>
        <h2>{guest}</h2>
        <div>
          <button disabled={guest === 1} onClick={() => setGuest((g) => g - 1)}>
            <i className="fa-solid fa-minus"></i>
          </button>
          <button
            disabled={guest === maxGuest}
            onClick={() => setGuest((g) => g + 1)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
}
