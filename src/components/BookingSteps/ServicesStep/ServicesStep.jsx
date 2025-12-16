export default function ServicesStep() {
  return (
    <>
      <div className="text-center">
        <h2>Select Your Services</h2>
        <p>Let us know all the services you would like for your party of 99</p>
      </div>
      <div className="d-flex justify-content-between gap-5">
        <div className="service-list">
          <div>
            <strong>Manicure</strong> <img src="/icon/down.svg" alt="" />
          </div>
          <div>
            <strong>Manicure</strong> <img src="/icon/down.svg" alt="" />
          </div>
        </div>
        <div className="selected-services">
          <strong>Service Pool Summary</strong>
          <div>
            <strong>Est.Total</strong>
            <strong>$0.00</strong>
          </div>
        </div>
      </div>
    </>
  );
}
