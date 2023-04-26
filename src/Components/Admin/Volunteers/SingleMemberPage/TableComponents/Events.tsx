import { EnrolmentType } from '../../../../../CustomHooks/TypesAndStates';

type Props = {
  nonExpiredEnrolments: EnrolmentType[];
};

function Events({ nonExpiredEnrolments }: Props) {
  return (
    <div className="overflow-x-auto mt-8 pb-8 md:ml-8">
      <div className="flex justify-start items-center rounded-lg  mt-2 pb-4">
        <h1 className="font-bold tracking-widest text-2xl ml-2 text-blue-500">
          Volunteer's Scheduled Events
        </h1>
      </div>
      <table className="table w-full table-normal">
        {/* head */}
        <thead>
          <tr>
            <th className="bg-blue-400 text-white"></th>
            <th className="bg-blue-400 text-white">Events</th>
            <th className="bg-blue-400 text-white">Dates</th>
            <th className="bg-blue-400 text-white">Timeslot</th>
          </tr>
        </thead>
        <tbody>
          {nonExpiredEnrolments?.map((event: any, index) => (
            <tr className="border-b-2" key={index}>
              <th>{index + 1}</th>
              <td className="text-blue-600 font-bold">
                {event?.program?.name}
              </td>
              <td>{event.date}</td>
              <td>{event.timeOfProgram}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Events;
