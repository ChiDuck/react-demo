export default function GuestStep() {
  return (
    <>
      <div className="text-center">
        <h2>Welcome</h2>
        <p>How many guests will be joining us today?</p>
      </div>
      <div className="guest-counter">
        <h3>Number of guest</h3>
        <h2>1</h2>
        <div>
          <button>-</button>
          <button>+</button>
        </div>
      </div>
    </>
  );
}
