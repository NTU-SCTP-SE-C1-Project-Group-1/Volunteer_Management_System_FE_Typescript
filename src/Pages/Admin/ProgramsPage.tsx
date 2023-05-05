import { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../Assets/spinner.gif';

// Apis
import { getAllEnrolments, reload } from '../../CustomHooks/ApiActions';

// Child Component
import ProgramsListing from '../../Components/Admin/Programs/ProgramsListing';

// Types
import { EnrolmentType } from '../../CustomHooks/TypesAndStates';

function ProgramsPage() {
  const [enrolmentsCopy, setEnrolmentsCopy] = useState<EnrolmentType[]>([]);
  const { authUser } = useGlobalAuthContext();

  const {
    data: enrolments,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['enrolments', authUser?.accessToken],
    queryFn: () => getAllEnrolments(authUser?.accessToken),
    onError: (err) => reload(err, authUser),
    onSuccess: (data) => {
      setEnrolmentsCopy(data?.data);
    },
  });

  if (isLoading) {
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="Loading" />
      </div>
    );
  }

  if (enrolments?.data.length === 0) {
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <h3>There are no currently no programs</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-auto md:min-h-[75vh] mt-24 mb-8">
      <div className="flex justify-between items-baseline w-[90%] pt-4 px-4">
        <h1 className="text-4xl p-4 text-left font-bold text-gray-600">
          Programs
        </h1>
        <Link to={'/admin/programs/new'}>
          <button className="flex justify-center items-center space-x-2 btn btn-secondary btn-sm text-white">
            <BiAddToQueue />
            New Program
          </button>
        </Link>
      </div>

      <div className="flex flex-col h-auto justify-center items-center">
        <ProgramsListing
          enrolments={enrolments?.data}
          enrolmentsCopy={enrolmentsCopy}
          setEnrolmentsCopy={setEnrolmentsCopy}
          isFetched={isFetched}
        />
      </div>
    </div>
  );
}

export default ProgramsPage;
