// Child Components
import Availabilities from './TableComponents/Availabilities';
// Types
import { AvailabilityType } from '../../../../CustomHooks/TypesAndStates';

type Props = {
  availabilities: AvailabilityType[];
  id: string | number;
  name: string;
};

function AvailabilityTable({ availabilities, id, name }: Props) {
  // Helper to reformat date
  const dateReformatter = (date: string) => {
    return new Date(new Date(date.split('-').reverse().join('-')));
  };
  const today = new Date();

  // Avails not past due
  let nonExpiredAvailabilities = availabilities?.filter(
    (avail) => dateReformatter(avail?.date as string) > today
  );

  // Availa confirmed - not false
  const listOfConfirmAvails = availabilities?.filter((avail) => avail.avail);

  return (
    <>
      {availabilities &&
      listOfConfirmAvails?.length !== 0 &&
      nonExpiredAvailabilities.length !== 0 ? (
        <Availabilities
          nonExpiredAvailabilities={nonExpiredAvailabilities}
          name={name}
          id={id}
        />
      ) : (
        <>
          <div className="flex justify-start items-center rounded-lg mt-8 md:ml-8">
            <h1 className="font-bold tracking-widest text-2xl ml-2 text-blue-500">
              Volunteer's Availability
            </h1>
          </div>
          <div className="flex p-1 mt-[-10px] md:ml-10">
            <h4 className="text-md text-error font-bold">
              Please note that volunteer don't have any available dates
            </h4>
          </div>
        </>
      )}
    </>
  );
}

export default AvailabilityTable;
