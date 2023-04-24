type Props = {
  value: string;
};

function DateAlreadySelected({ value }: Props) {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle w-screen z-50">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">
            {value.substring(0, 16)}
          </h3>
          <p className="py-4 text-lg">
            You have already marked this date. Do you want to change it?
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-4" className="btn btn-error text-white">
              Unmarked date
            </label>
            <label htmlFor="my-modal-4" className="btn btn-primary">
              Ok, got it!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateAlreadySelected;
