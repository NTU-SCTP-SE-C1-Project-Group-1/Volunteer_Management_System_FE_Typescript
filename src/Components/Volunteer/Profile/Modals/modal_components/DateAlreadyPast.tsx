function DateAlreadyPast() {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">
            Date selected has already passed!
          </h3>
          <p className="py-4">
            Please note that the earliest avail date for selection would be
            tomorrow.
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-4" className="btn btn-primary">
              Ok, got it!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateAlreadyPast;
