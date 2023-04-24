type Props = {
  value: string;
};

function DateWithEnrolledProgram({ value }: Props) {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-error">
            {value.substring(0, 16)}
          </h3>
          <p className="py-4 text-lg font-semibold">
            You have a scheduled event on the selected date. Please contact your
            administrator if you can't make it. Please click on Upcoming Events
            tab to view your events.
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

export default DateWithEnrolledProgram;
