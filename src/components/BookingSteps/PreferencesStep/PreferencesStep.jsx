export default function PreferencesStep() {
  return (
    <>
      <div className="text-center">
        <h3>Technician Preferences</h3>
        <p>
          Let us know who you'd like. If you don't have a preference, we will
          assign you to anyone first available
        </p>
      </div>
      <div className="technician-select">
        <label>Preferred Technicians for 1 Guests</label>
        <div></div>
        <span>You can select up to 1 preference(s). 0 selected.</span>
      </div>
    </>
  );
}
