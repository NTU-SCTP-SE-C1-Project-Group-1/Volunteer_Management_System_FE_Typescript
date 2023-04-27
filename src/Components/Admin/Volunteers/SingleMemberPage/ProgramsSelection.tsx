import { Link } from 'react-router-dom';

import { EnrolmentType } from '../../../../CustomHooks/TypesAndStates';

type Props = {
  filteredEnrolments: EnrolmentType[];
  id: string | number;
  date: string | Date;
  name: string;
};

function ProgramsSelection({ filteredEnrolments, id, date, name }: Props) {
  return (
    <>
      {filteredEnrolments.length === 0 ? (
        <div className="flex flex-col items-center px-4 md:w-[100%]">
          <h1 className="text-error font-bold text-lg text-center">
            There are no programs on {date as string} with matching timeslots
            for {name}
          </h1>
          <Link to={`/admin/volunteers/${id}`}>
            <button className="btn btn-primary mt-4 btn-sm">Back</button>
          </Link>
        </div>
      ) : (
        <div className="w-full h-auto md:h-auto mx-auto flex flex-col items-center mt-10 px-12">
          <div className="flex flex-col justify-center items-center p-4">
            <h1 className="text-2xl font-bold text-blue-700">
              Events on {date as string}
            </h1>
            <p className="text-gray-600 text-semibold text-lg">
              Select program for -{' '}
              <span className="font-bold text-blue-500">{name}</span>
            </p>
          </div>

          <div className="overflow-x-auto w-[80%]">
            <table className="table table-normal w-full">
              {/* head */}
              <thead>
                <tr>
                  <th className="bg-blue-400 text-white">Event</th>
                  <th className="bg-blue-400 text-white">Date</th>
                  <th className="bg-blue-400 text-white">Timeslot</th>
                  <th className="bg-blue-400 text-white"></th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrolments.map((enrol: any, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              // src="https://static.thehoneycombers.com/wp-content/uploads/sites/2/2017/11/Salvation-Army.jpg"
                              src={
                                enrol?.program.photo ||
                                'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2017/11/Salvation-Army.jpg'
                              }
                              alt="Elderly"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {enrol?.program?.name}
                          </div>
                          <div className="text-sm opacity-50">
                            Deliver food at Boon Lay
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {enrol?.date}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Jurong West
                      </span>
                    </td>
                    <td>{enrol?.timeOfProgram}</td>
                    <th>
                      <button
                        // onClick={() =>
                        //   enrolVolunteerIntoProgram(
                        //     id,
                        //     enrol?.program?.id,
                        //     newDate,
                        //     false
                        //   )
                        // }
                        className="btn btn-info btn-xs text-white"
                      >
                        Enrol
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to={`/admin/volunteers/${id}`}>
            <button className="btn btn-primary mt-12 btn-sm">Back</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default ProgramsSelection;
