import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProgramInfo from '../../Components/Admin/Programs/ProgramInfo';
import { useQuery } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import Spinner from '../../Assets/spinner.gif';
// Apis
import {
  reload,
  getAllEnrolments,
  getVolunteersInEnrolment,
  getAllAvailabilities,
} from '../../CustomHooks/ApiActions';
// Types
import {
  EnrolmentType,
  AvailabilityType,
  VolunteerTypeFromApi,
} from '../../CustomHooks/TypesAndStates';

function ProgramInfoPage() {
  const { id } = useParams();
  const [enrolment, setEnrolment] = useState({} as EnrolmentType);
  const { authUser } = useGlobalAuthContext();

  // Get enrolments and filter the specific program to be displayed on page
  const { isLoading } = useQuery({
    queryKey: ['enrolments', authUser?.accessToken],
    queryFn: () => getAllEnrolments(authUser?.accessToken),
    onError: (err) => reload(err, authUser),
    onSuccess: (data) => {
      const enrolmentData = data?.data.find((item: EnrolmentType) => {
        return Number(item?.program?.id) === Number(id);
      });
      if (enrolmentData?.program) {
        setEnrolment(enrolmentData);
      }
    },
  });

  // Get enrolment date to determine if program is already past due
  const newDate = (enrolment?.date as string)?.split('-').reverse().join('-');
  const enrolmentDate = new Date(newDate as string);
  const today = new Date();
  const closed = today >= enrolmentDate;

  // Get all volunteers enrolled in this program
  const { data: volunteersInEnrolment } = useQuery({
    queryKey: ['volunteersInEnrolment', authUser?.accessToken, id as string],
    queryFn: () =>
      getVolunteersInEnrolment({
        token: authUser?.accessToken,
        id: id as string,
      }),
    // onError: (err) => reload(err, authUser),
    onSuccess: (data) => {
      // console.log(data?.data);
    },
  });

  // Get all Availabilities
  const { data: availabilities } = useQuery({
    queryKey: ['availabilities'],
    queryFn: () => getAllAvailabilities(authUser?.accessToken),
    onSuccess: (data) => {
      // console.log(data?.data);
    },
    onError: (err: any) => {
      console.log(err.message);
    },
  });

  // Extract Only the availabilities that match the program date
  const availsWithMatchDate = availabilities?.data?.filter(
    (avail: AvailabilityType) => avail.date === enrolment?.date
  );

  // Extract list of volunteers who have indicated they are available on enrolment date
  const volunteersAvail = availsWithMatchDate?.map(
    (avail: AvailabilityType) => avail.volunteer
  );

  // Filter out only those volunteers who are available and have not enrolled
  function getDifference(
    array1: VolunteerTypeFromApi[],
    array2: VolunteerTypeFromApi[]
  ) {
    if (array1?.length === 0) return [];
    if (array2?.length === 0) return array1;
    return array1?.filter((object1) => {
      return !array2?.some((object2) => {
        return object1.id === object2.id;
      });
    });
  }

  // Get only those volunteers who are avail on enrolment date and not enrolled in program
  const availVounteersNotEnrolledYet = getDifference(
    volunteersAvail,
    volunteersInEnrolment?.data
  );

  if (isLoading)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="Loading" />
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center w-screen md:mt-32">
      <ProgramInfo
        enrolment={enrolment}
        closed={closed}
        volunteersAvail={volunteersAvail}
        volunteersEnrolled={volunteersInEnrolment?.data}
        availVounteersNotEnrolledYet={availVounteersNotEnrolledYet}
      />
    </div>
  );
}

export default ProgramInfoPage;
