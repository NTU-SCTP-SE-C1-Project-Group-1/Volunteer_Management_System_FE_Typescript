import { FaThumbsUp } from 'react-icons/fa';
import { AvailabilityType } from '../../../../CustomHooks/TypesAndStates';

type Props = {
  availabilities: AvailabilityType[];
};

function AvailabilitiesOfVolunteer({ availabilities }: Props) {
  // Helper to reformat date
  const dateReformatter = (date: string): Date => {
    return new Date(date.split('-').reverse().join('-'));
  };

  // Get today's date
  const today = new Date();

  // Filter off all enrolments past today
  let nonExpiredAvails =
    availabilities?.filter(
      (avail) => dateReformatter(avail?.date as string) > today
    ) || [];
  return (
    <>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {nonExpiredAvails?.length !== 0 ? (
            <>
              <h2 className="text-teal-700 text-md font-semibold p-2">
                Your list of avail dates and timeslots
              </h2>
              <div className="overflow-x-auto">
                <table className="table table-compact w-full mb-4">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="bg-blue-800 text-white"></th>
                      <th className="bg-blue-800 text-white">Date</th>
                      <th className="bg-blue-800 text-white">Timeslot</th>
                      <th className="bg-blue-800 text-white"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {nonExpiredAvails?.map((avail: AvailabilityType, index) => (
                      <tr className="border-b-2" key={index + 1}>
                        <th>{index + 1}</th>
                        <td>{avail.date as string}</td>
                        <td className="font-bold text-blue-600">
                          {avail.timeslot}
                        </td>
                        <td>
                          <div className="flex justify-center items-center">
                            <FaThumbsUp color={'lightgreen'} size={20} />
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* row 1 */}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg text-error">
                No avail dates found!
              </h3>
              <p className="py-4">
                You have not set any availability dates. Please do it to allow
                your administrator to enrol you for upcoming events!
              </p>
            </>
          )}

          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn btn-primary">
              Got it!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailabilitiesOfVolunteer;
