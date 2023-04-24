type Props = {
  value: string;
  setTimeslot: React.Dispatch<React.SetStateAction<string>>;
  timeSlot: string;
};
function DateSlotSelection({ value, setTimeslot, timeSlot }: Props) {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box h-[65vh] flex flex-col justify-center items-center px-4 text-center mt-10">
          {/* <h1 className="text-3xl font-semibold pb-4">
            Mark your availability
          </h1> */}
          <p className="px-12 pb-4 text-2xl text-blue-700 font-bold">
            Please select your preferred timeslot:
          </p>
          <h3 className="font-bold text-red-500 text-2xl tracking-wider">
            {value.substring(0, 16)}
          </h3>

          {/* SELECT PREFERRED TIME SLOTS */}
          <h2 className="font-bold pt-2 pb-4">Preferred Time Slots:</h2>
          <div className="form-control flex justify-between w-[240px]">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold text-pink-400">
                0800hrs - 1200hrs
              </span>
              <input
                type="radio"
                name="radio-10"
                value="0800hrs - 1200hrs"
                // onClick={timeSlotChangeHandler}
                className="radio radio-primary checked:bg-green-500"
                // ref={radio}
              />
            </label>
          </div>
          <div className="form-control flex justify-between w-[240px]">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold text-pink-400">
                1300hrs - 1800hrs
              </span>
              <input
                // onChange={timeSlotChangeHandler}
                type="radio"
                name="radio-10"
                value="1300hrs - 1800hrs"
                // onClick={timeSlotChangeHandler}
                className="radio checked:bg-green-500"
                // ref={radio}
              />
            </label>
          </div>

          <div className="form-control flex justify-between w-[240px]">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold text-pink-400">
                1900hrs - 2200hrs
              </span>
              <input
                type="radio"
                name="radio-10"
                value="1900hrs - 2200hrs"
                // onChange={timeSlotChangeHandler}
                className="radio checked:bg-green-500"
                // ref={radio}
              />
            </label>
          </div>

          <div className="form-control flex justify-between w-[240px]">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold text-pink-400">
                Full day
              </span>
              <input
                type="radio"
                name="radio-10"
                value="Full day"
                // onChange={timeSlotChangeHandler}
                className="radio checked:bg-green-500"
                // ref={radio}
              />
            </label>
          </div>

          {/* BUTTONS */}
          <div className="modal-action">
            <label
              htmlFor="my-modal-4"
              className="btn btn-error text-white btn-sm"
            >
              Cancel
            </label>
            <label
              htmlFor="my-modal-4"
              //   onClick={updateAvailability}
              className="btn btn-primary btn-sm text-white px-4"
            >
              Set
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateSlotSelection;
