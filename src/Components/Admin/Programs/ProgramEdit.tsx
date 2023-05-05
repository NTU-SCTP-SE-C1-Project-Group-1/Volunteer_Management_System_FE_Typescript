import { Link } from 'react-router-dom';

// Type
import { ProgramType } from '../../../CustomHooks/TypesAndStates';

interface Props {
  id: string;
  form: ProgramType;
  handleChange: (e: any) => void;
  handleClickToEdit: (e: any) => void;
  error: string;
}

function ProgramEdit({
  id,
  form,
  handleChange,
  handleClickToEdit,
  error,
}: Props) {
  return (
    <div className="h-screen">
      {/* <p className="py-0 h-[3px] text-red-500 text-center">{error}</p> */}
      <div className="flex flex-col justify-center items-center w-screen md:w-[50vw]">
        <p className="py-0 h-[2px] text-red-500">{error}</p>
        {/* 1st Row Inputs */}
        <div className="flex justify-center items-center">
          <div className="flex flex-col">
            <label
              className="pb-2 text-left font-semibold text-sm"
              htmlFor="name"
            >
              Name of Program:
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name of program"
              type="text"
              className="input input-bordered input-info w-[75vw] md:w-[40vw] input-md"
            />
          </div>
        </div>
        {/* 2nd Row Inputs */}
        <div className="flex mt-4 justify-center items-center">
          <div className="flex flex-col">
            <label className="pb-2 font-semibold text-sm" htmlFor="photo">
              Photo (URL):
            </label>
            <input
              id="photo"
              name="photo"
              value={form.photo}
              onChange={handleChange}
              type="text"
              placeholder="Your image url"
              className="input input-bordered input-info w-[75vw] md:w-[40vw] input-md"
            />
          </div>
        </div>
        {/* 3rd Row Inputs */}
        <div className="flex mt-5 justify-center items-center">
          <div className="flex flex-col">
            <label className="pb-2 font-semibold text-sm" htmlFor="date">
              Date:
            </label>
            <input
              id="date"
              name="date"
              value={form.date as string}
              onChange={handleChange}
              type="date"
              placeholder="Date of program"
              className="input input-bordered input-info w-[75vw] md:w-[40vw] input-md"
            />
          </div>
        </div>
        {/* 3rd Row Inputs */}
        <div className="flex flex-col md:flex-row md:justify-between justify-center items-center mt-5 md:space-x-12 w-[40vw]">
          <div className="flex flex-col mb-2 w-[82vw] md:w-[18vw]">
            <label
              className="pb-2 font-semibold text-sm"
              htmlFor="timeOfProgram"
            >
              Time of Program:
            </label>
            <select
              name="timeOfProgram"
              value={form.timeOfProgram}
              onChange={handleChange}
              className="select select-info  md:w-[18vw] select-md text-md font-normal"
            >
              <option selected>Timeslot</option>
              <option>0800hrs - 1200hrs</option>
              <option>1300hrs - 1800hrs</option>
              <option>1900hrs - 2200hrs</option>
              <option>Full day</option>
            </select>
          </div>
          <div className="flex flex-col mb-2 w-[82vw] md:w-[18vw]">
            <label className="pb-2 pt-1 font-semibold text-sm" htmlFor="date">
              Volunteers:
            </label>
            <input
              id="volunteersRequired"
              name="volunteersRequired"
              value={form.volunteersRequired}
              onChange={handleChange}
              type="number"
              placeholder="Volunteers required"
              className="input input-bordered input-info input-md"
            />
          </div>
        </div>

        {/* 4th row Inputs */}
        <div className="flex flex-col mt-4 justify-center items-center w-screen md:w-[40vw]">
          <div className="flex flex-col ">
            <label className="pb-2 font-semibold text-sm" htmlFor="description">
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
              className="textarea textarea-info textarea-md w-[75vw] md:w-[40vw]"
              placeholder="Program description."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 space-x-2 mt-2">
          <Link to={`/admin/programs/${id}`}>
            <button className="btn btn-info text-white btn-sm">Back</button>
          </Link>

          <button
            onClick={handleClickToEdit}
            className="btn btn-secondary btn-sm"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgramEdit;
