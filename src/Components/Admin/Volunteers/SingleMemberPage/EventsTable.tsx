import { EnrolmentType } from '../../../../CustomHooks/TypesAndStates';

// Child Component
import Events from './TableComponents/Events';

type enrolmentsType = {
  enrolments: EnrolmentType[];
  id: string | number;
};

function EventsTable({ enrolments, id }: enrolmentsType) {
  // Helper to reformat date
  const dateReformatter = (date: string) => {
    return new Date(date.split('-').reverse().join('-'));
  };
  const today = new Date();

  // Filter off all enrolments past today
  let nonExpiredEnrolments =
    enrolments?.filter(
      (enrolment) => dateReformatter(enrolment?.date as string) > today
    ) || [];

  return (
    <>
      {nonExpiredEnrolments?.length !== 0 ? (
        <>
          <Events
            nonExpiredEnrolments={nonExpiredEnrolments}
            id={id as string}
          />
        </>
      ) : (
        <>
          <div className="flex justify-start items-center rounded-lg mt-8 md:ml-8">
            <h1 className="font-bold tracking-widest text-2xl ml-2 text-blue-500">
              Volunteer's Scheduled Events
            </h1>
          </div>
          <div className="flex p-1 mt-[-10px] md:ml-10">
            <h4 className="text-md text-error font-bold">
              Please note that volunteer don't have any scheduled events
            </h4>
          </div>
        </>
      )}
    </>
  );
}

export default EventsTable;
