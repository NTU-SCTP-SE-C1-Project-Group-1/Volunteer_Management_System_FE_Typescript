import { EnrolmentType } from '../../../../CustomHooks/TypesAndStates';

type Props = {
  enrolments: EnrolmentType[];
};

function ProgramsEnrolledModal({ enrolments }: Props) {
  // Helper to reformat date
  const dateReformatter = (date: string): Date => {
    return new Date(date.split('-').reverse().join('-'));
  };
  const today = new Date();

  // Filter off all enrolments past today
  let nonExpiredEvents =
    enrolments?.filter(
      (enrol) => dateReformatter(enrol?.date as string) > today
    ) || [];
  return (
    <>
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle modal-middle"
      />
      <div className="modal">
        <div className="modal-box relative min-h-[15vh] h-auto">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {nonExpiredEvents?.length === 0 ? (
            <>
              <p className="text-center pt-6 text-error font-bold">
                {' '}
                You are not enrolled in any programs, or the programs you've
                enrolled have expired.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold  pb-4">
                Events you have been enroled:
              </h3>
              <p className="text-error font-semibold text-sm">
                (Please contact your administrator if you have not recieived any
                email confirmation to attend the events)
              </p>
              <div className="overflow-x-auto mt-2">
                <table className="table table-compact w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="bg-blue-800"></th>
                      <th className="bg-blue-800 text-white">Event</th>
                      <th className="bg-blue-800 text-white">Date</th>
                      <th className="bg-blue-800 text-white">Timeslot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {nonExpiredEvents?.map((enrolment: any, index: any) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td className="text-blue-600 font-bold">
                          {enrolment.program.name}
                        </td>
                        <td>{enrolment.date}</td>
                        <td>{enrolment.timeOfProgram}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h1 className="py-4 text-red-600 text-center font-bold text-lg">
                See you soon!
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProgramsEnrolledModal;
