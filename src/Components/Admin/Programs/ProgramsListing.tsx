import Spinner from '../../../Assets/spinner.gif';

// Child
import ProgramItem from './ProgramItem';

// Type
import { EnrolmentType } from '../../../CustomHooks/TypesAndStates';

type Props = {
  enrolments: EnrolmentType[];
  enrolmentsCopy: EnrolmentType[];
  setEnrolmentsCopy: React.Dispatch<React.SetStateAction<EnrolmentType[]>>;
};

function ProgramsListing({
  enrolments,
  enrolmentsCopy,
  setEnrolmentsCopy,
}: Props) {
  const dateReformatter = (date: string) => {
    return new Date(date.split('-').reverse().join('-'));
  };

  const today = new Date();

  const filterOptions = (option: string) => {
    switch (option) {
      case 'ALL':
        setEnrolmentsCopy(enrolments);
        break;
      case 'ACTIVE':
        const activeEnrolments = enrolments.filter(
          (enrolment) => dateReformatter(enrolment.date as string) >= today
        );
        setEnrolmentsCopy(activeEnrolments);
        break;
      case 'CLOSED':
        const closeEnrolments = enrolments.filter(
          (enrolment) => dateReformatter(enrolment.date as string) <= today
        );
        setEnrolmentsCopy(closeEnrolments);
        break;
      default:
        return;
    }
  };

  if (enrolments?.length === 0) {
    return (
      <div className="w-full h-auto md:h-screen mx-auto lg:w-10/12 px-16">
        <div>
          <h1>There are currently no programs listed</h1>
        </div>
      </div>
    );
  }

  if (!enrolments) {
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="Loading" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center pb-4 space-x-2">
        <button
          onClick={() => filterOptions('ALL')}
          className="btn btn-primary btn-sm"
        >
          All Programs
        </button>
        <button
          onClick={() => filterOptions('ACTIVE')}
          className="btn btn-success text-white btn-sm"
        >
          Active Programs
        </button>
        <button
          onClick={() => filterOptions('CLOSED')}
          className="btn text-white btn-error btn-sm"
        >
          Closed Programs
        </button>
      </div>

      {enrolmentsCopy.length === 0 ? (
        <div>
          <h3 className="tracking-wider text-error">No programs listed</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {enrolmentsCopy?.map((enrolment, index) => (
            <ProgramItem enrolment={enrolment} key={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default ProgramsListing;
