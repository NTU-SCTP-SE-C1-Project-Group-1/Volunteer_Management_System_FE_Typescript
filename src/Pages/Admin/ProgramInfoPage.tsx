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
} from '../../CustomHooks/ApiActions';
// Types
import { EnrolmentType } from '../../CustomHooks/TypesAndStates';

function ProgramInfoPage() {
  const { id } = useParams();
  const [enrolment, setEnrolment] = useState({} as EnrolmentType);
  const { authUser } = useGlobalAuthContext();

  // Get enrolments and filter the specific program to be displayed on page
  const { isLoading } = useQuery({
    queryKey: ['enrolments', authUser?.accessToken],
    queryFn: () => getAllEnrolments(authUser?.accessToken),
    // onError: (err) => reload(err, authUser),
    onSuccess: (data) => {
      const enrolmentData = data?.data.find((item: EnrolmentType) => {
        return Number(item?.program?.id) === Number(id);
      });
      if (enrolmentData) {
        setEnrolment(enrolmentData);
      }
    },
  });

  console.log(enrolment);

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

  // Extract Only the availabilities that match the program date

  if (isLoading)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="Loading" />
      </div>
    );

  return (
    <div className="flex flex-col h-auto p-8 justify-start items-center">
      {/* <ProgramInfo
        enrolment={enrolment}
        closed={closed}
        volunteersEnrolled={volunteersInEnrolment?.data}
      /> */}
    </div>
  );
}

export default ProgramInfoPage;
