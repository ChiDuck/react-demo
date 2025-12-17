import "../BookingSteps.scss";
export default function DateStep() {
  return (
    <>
      <div className="text-center">
        <h3>Select a Date</h3>
        <p>
          Available dates are shown based on your group size and preferred
          technicians.
        </p>
      </div>
      <div className="date-select">
        <div>
          <button>&lt;</button>
          <h3>January 2222</h3>
          <button>&gt;</button>
        </div>
        <div className="weekday">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        <div className="date-grid">
          <div>1</div>
          <div>2</div>
          <div>2</div>
          <div>2</div>
          <div>2</div>
          <div>2</div>
          <div>2</div>
          <div>2</div>
          <div>2</div>
        </div>
      </div>
    </>
  );
}
