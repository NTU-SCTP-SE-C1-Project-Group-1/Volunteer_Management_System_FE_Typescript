import { AvailabilityType } from '../../../../../CustomHooks/TypesAndStates';

// Child component
import AvailRow from './AvailRow';

type Props = {
  nonExpiredAvailabilities: AvailabilityType[];
  name: string;
  id: string | number;
};

function Availabilities({ nonExpiredAvailabilities, name, id }: Props) {
  return (
    <div className="md:overflow-x-auto mt-8 pb-8 w-[35vw] ml-[-40px] md:ml-8 md:w-[60vw]">
      <div className="flex justify-start items-center rounded-lg  mt-2 pb-4">
        <h1 className="font-bold tracking-widest text-2xl ml-2 text-blue-500">
          Volunteer's Availability
        </h1>
      </div>
      <table className="table w-full table-normal">
        {/* head */}
        <thead>
          <tr>
            <th className="bg-blue-400 text-white"></th>
            <th className="bg-blue-400 text-white">Dates</th>
            <th className="bg-blue-400 text-white">Timeslots</th>
            <th className="bg-blue-400 text-white">Enrolment</th>
          </tr>
        </thead>
        <tbody>
          {nonExpiredAvailabilities?.map((avail, index) => (
            <AvailRow
              date={avail.date}
              timeslot={avail.timeslot}
              index={index + 1}
              id={id}
              name={name}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Availabilities;
