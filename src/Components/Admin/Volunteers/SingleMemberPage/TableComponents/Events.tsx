import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../../../../Context/AuthContext';
// APIs
import {
  updateAvailabilityOfVolunteer,
  unenrolVolunteer,
} from '../../../../../CustomHooks/ApiActions';
// Type
import { EnrolmentType } from '../../../../../CustomHooks/TypesAndStates';

type Props = {
  nonExpiredEnrolments: EnrolmentType[];
  id: string;
};

function Events({ nonExpiredEnrolments, id }: Props) {
  const { authUser } = useGlobalAuthContext();

  // Params - token, volunteerId, date, isAvail,
  // API to update availability of volunteer to false
  const queryClient = useQueryClient();
  const { mutate: updateAvailability } = useMutation({
    mutationFn: updateAvailabilityOfVolunteer,
    onSuccess: () => {
      queryClient.invalidateQueries(['availabilities']);
    },
    onError: (err: any) => console.log(err),
  });

  // Params -   volunteerId, programId, token,
  // API to unenrol a volunteer from a program
  const { mutate: unenrolVolunteerFromProgram } = useMutation({
    mutationFn: unenrolVolunteer,
    onSuccess: () => {
      queryClient.invalidateQueries(['enrolmentsOfVolunteer']);
    },
  });

  const clicktoUnenrol = (
    programId: string,
    volunteerId: string,
    date: string
  ) => {
    const unenrolProps = {
      volunteerId: volunteerId,
      programId: programId,
      token: authUser?.accessToken,
    };
    const updateAvail = {
      token: authUser?.accessToken,
      volunteerId: volunteerId,
      date: date.split('-').reverse().join('-'),
      isAvail: true,
    };
    unenrolVolunteerFromProgram(unenrolProps);
    updateAvailability(updateAvail);
  };

  return (
    <div className="md:overflow-x-auto mt-8 pb-8 w-[35vw] ml-[-40px] md:ml-8 md:w-[60vw]">
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
            <th className="bg-blue-400 text-white">Unenrol</th>
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
              <td>
                <button
                  onClick={() =>
                    clicktoUnenrol(event?.program?.id, id, event?.date)
                  }
                  className="btn btn-error btn-sm text-white"
                >
                  Unenrol
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Events;
