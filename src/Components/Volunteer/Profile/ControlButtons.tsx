function ControlButtons() {
  return (
    <div className="flex flex-col justify-center items-baseline space-y-3 md:flex-row md:justify-start md:items-end space-x-3">
      <label
        // htmlFor="my-modal-3"
        className="btn btn-info text-white w-[91%] md:w-[15%]"
      >
        Upcoming Events
      </label>
      <label
        // htmlFor="my-modal-6"
        className="btn btn-primary w-[91%] md:w-[15%]"
      >
        Availability
      </label>

      <button
        // onClick={goToReset}
        className="w-[100%] md:w-[20%] btn btn-accent text-white"
      >
        Change password
      </button>

      <button
        // onClick={goToEdit}
        className="w-[100%] md:w-[20%] btn btn-secondary text-white"
      >
        Edit Profile
      </button>
    </div>
  );
}

export default ControlButtons;
