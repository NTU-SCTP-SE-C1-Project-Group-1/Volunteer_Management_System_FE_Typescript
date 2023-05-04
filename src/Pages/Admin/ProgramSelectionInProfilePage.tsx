import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../Context/AuthContext';

// Child Component
import ProgramsSelection from '../../Components/Admin/Volunteers/SingleMemberPage/ProgramsSelection';

// APIs
import { getAllEnrolments, reload } from '../../CustomHooks/ApiActions';

// Types
import { EnrolmentType } from '../../CustomHooks/TypesAndStates';

function ProgramSelectionInProfilePage() {
  const { authUser } = useGlobalAuthContext();
  const { id, timeslot, date, name } = useParams();

  const { data: enrolments, isLoading } = useQuery({
    queryKey: ['enrolments', authUser?.accessToken],
    queryFn: () => getAllEnrolments(authUser?.accessToken),
    // onSuccess: (data) => {
    //   console.log(data?.data);
    // },
    onError: (err) => {
      reload(err, authUser);
    },
  });

  // Filter enrolments with matching dates and time slots
  const findEnrolmentByDateAndTime: EnrolmentType[] =
    enrolments?.data.filter(
      (enrolment: EnrolmentType) =>
        enrolment.date === date && enrolment.timeOfProgram === timeslot
    ) || [];

  // console.log(findEnrolmentByDateAndTime);

  const findEnrolmentByDate: EnrolmentType[] =
    enrolments?.data.filter(
      (enrolment: EnrolmentType) => enrolment.date === date
    ) || [];

  // console.log(findEnrolmentByDate);

  const filteredEnrolments: EnrolmentType[] =
    timeslot === 'Full day' ? findEnrolmentByDate : findEnrolmentByDateAndTime;

  // console.log(filteredEnrolments);

  if (isLoading)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="flex w-full h-auto md:h-[75vh] md:w-screen mt-32">
      <ProgramsSelection
        filteredEnrolments={filteredEnrolments}
        id={id as string}
        date={date as string}
        name={name as string}
      />
    </div>
  );
}

export default ProgramSelectionInProfilePage;
