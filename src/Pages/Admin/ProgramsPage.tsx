import { BiAddToQueue } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getAllEnrolments, reload } from '../../CustomHooks/ApiActions';

// Child Component
import ProgramsListing from '../../Components/Admin/Programs/ProgramsListing';

function ProgramsPage() {
  const { authUser } = useGlobalAuthContext();

  const { data: enrolments } = useQuery({
    queryKey: ['enrolments', authUser?.accessToken],
    queryFn: () => getAllEnrolments(authUser?.accessToken),
    onError: (err) => reload(err, authUser),
    onSuccess: (data) => console.log(data),
  });

  return (
    <div className="flex flex-col h-auto md:h-[75vh] mt-24">
      <div className="flex justify-between items-baseline w-[90%] pt-4 px-4">
        <h1 className="text-4xl p-4 text-left font-bold text-gray-600">
          Programs
        </h1>
        <Link to={'/admin/programkickstarter'}>
          <button className="flex justify-center items-center space-x-2 btn btn-secondary btn-sm text-white">
            <BiAddToQueue />
            New Program
          </button>
        </Link>
      </div>

      <div className="flex flex-col min-h-[74vh] h-auto p-8 justify-start items-center">
        <ProgramsListing enrolments={enrolments?.data} />
      </div>
    </div>
  );
}

export default ProgramsPage;
