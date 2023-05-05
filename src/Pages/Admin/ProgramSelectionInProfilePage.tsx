import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../Context/AuthContext';

// Child Component
import ProgramsSelection from '../../Components/Admin/Volunteers/SingleMemberPage/ProgramsSelection';

// APIs
import {
  getAllEnrolments,
  reload,
  enrolVolunteer,
} from '../../CustomHooks/ApiActions';

// Types
import { EnrolmentType } from '../../CustomHooks/TypesAndStates';
import { updateAvailabilityOfVolunteer } from '../../CustomHooks/ApiActions';

function ProgramSelectionInProfilePage() {
  const redirect = useNavigate();
  const { authUser } = useGlobalAuthContext();
  const { id, timeslot, date, name } = useParams();

  // Convert date formate to be passed in updateVolunteerAvailability API call
  const newDate: string = (date as string).split('-').reverse().join('-');

  // API to get all enrolments
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

  // Enrolments matching specific date and timeslot
  const findEnrolmentByDateAndTime: EnrolmentType[] =
    enrolments?.data.filter(
      (enrolment: EnrolmentType) =>
        enrolment.date === date && enrolment.timeOfProgram === timeslot
    ) || [];

  // Enrollments matching specific date
  const findEnrolmentByDate: EnrolmentType[] =
    enrolments?.data.filter(
      (enrolment: EnrolmentType) => enrolment.date === date
    ) || [];

  // if volunteer's avail is full-day, return all programs on specific date
  // else return only enrolments on specific date that matches timeslot of volunteer
  const filteredEnrolments: EnrolmentType[] =
    timeslot === 'Full day' ? findEnrolmentByDate : findEnrolmentByDateAndTime;

  const queryClient = useQueryClient();

  // API to update availability of a volunteer
  const { mutate: updateAvail } = useMutation({
    mutationFn: updateAvailabilityOfVolunteer,
    onSuccess: (data) => {
      console.log(data?.data);
      queryClient.invalidateQueries(['availabilities']);
    },
  });

  // API to enrol volunteer
  const { mutate: enrol } = useMutation({
    mutationFn: enrolVolunteer,
    onSuccess: (data) => {
      console.log(data?.data);
      const params = {
        token: authUser?.accessToken,
        volunteerId: id as string,
        date: newDate,
        isAvail: false,
      };
      updateAvail(params);
      queryClient.invalidateQueries(['enrolmentsOfVolunteer']);
      redirect(`/admin/volunteers/${id}`);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  // OnClick to enrol
  const onClickToEnrol = (volunteerId: string, programId: string) => {
    const props = {
      token: authUser?.accessToken,
      volunteerId: volunteerId,
      programId: programId as string,
    };
    // console.log(props);
    enrol(props);
  };

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
        onClickToEnrol={onClickToEnrol}
        id={id as string}
        date={date as string}
        name={name as string}
      />
    </div>
  );
}

export default ProgramSelectionInProfilePage;
