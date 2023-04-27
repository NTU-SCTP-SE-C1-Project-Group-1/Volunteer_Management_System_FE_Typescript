import { useState } from 'react';
import { useGlobalAuthContext } from '../../../../Context/AuthContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import Spinner from '../../../../Assets/spinner.gif';
// import storage from '../../../../CustomHooks/LocalStorage';

// Child Components
import VolunteerItem from './VolunteerItem';
import Pagination from './Pagination';
import SearchField from './SearchField';
import FilterSelectors from './FilterSelectors';

// Types and API actions
import { VolunteerTypeFromApi } from '../../../../CustomHooks/TypesAndStates';
import {
  getAllVolunteers,
  reload,
  searchVolunteersByParams,
} from '../../../../CustomHooks/ApiActions';

function VolunteerList() {
  const { authUser } = useGlobalAuthContext();
  const [volunteersCopy, setVolunteersCopy] = useState(
    {} as VolunteerTypeFromApi[]
  );
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [filters, setFilters] = useState({
    experience: '',
    education: 'na',
    language: 'na',
  });

  // Timeout
  const timeout = () => setTimeout(() => setErrorMsg(() => ''), 3000);

  // OnChange for Search Field and Filter selectors
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Clear field and filters and return all volunteers
  const clear = () => {
    setFilters({ experience: '', education: '', language: '' });
    setVolunteersCopy(allVolunteers?.data);
    setPage(() => 1);
  };

  // API - Get all volunteers
  const { data: allVolunteers, isLoading: volunteerIsLoading } = useQuery({
    queryKey: ['volunteers', authUser?.accessToken],
    queryFn: () => getAllVolunteers(authUser?.accessToken),
    onSuccess: (data) => {
      // console.log(data?.data);
      setVolunteersCopy(data?.data);
    },
    onError: (err: any) => {
      // setErrorMsg(err?.message);
      // timeout();
      reload(err, authUser);
    },
  });

  // API - Search volunteers by params
  const { mutate } = useMutation({
    mutationFn: searchVolunteersByParams,
    onSuccess: (data) => {
      console.log(data?.data);
      setVolunteersCopy(data?.data);
      setErrorMsg(data?.data.length + ' results found');
      timeout();
      setPage(() => 1);
    },
    onError: (err: any) => {
      setErrorMsg(err?.message);
      timeout();
    },
  });

  // http://localhost:8080/admin/volunteers/search?experience=&education=A%20Levels&language=

  // Search - OnClick to call API based on filter selection
  const search = (e: any) => {
    e.preventDefault();
    if (
      filters.education === 'na' &&
      filters.language === 'na' &&
      filters.experience === ''
    )
      return;
    const params = {
      token: authUser?.accessToken,
      experience: filters.experience || 'na',
      education: filters.education || 'na',
      language: filters.language || 'na',
    };
    mutate(params);
  };

  // Pagination Logic
  const [numOfVolPerPage, setNumOfVolPerPage] = useState<number>(8);
  const [page, setPage] = useState(1);
  const lastIndex = (page * numOfVolPerPage) as number;
  const firstIndex: number = lastIndex - numOfVolPerPage;
  const volunteersShownOnPage = Array.from(volunteersCopy)?.slice(
    firstIndex as number,
    lastIndex
  );
  const totalPages = Math.ceil(volunteersCopy?.length / numOfVolPerPage);

  if (volunteerIsLoading)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="Loading" />
      </div>
    );

  return (
    <>
      <SearchField
        experience={filters.experience}
        handleChange={handleChange}
        search={search}
        clear={clear}
      />
      <FilterSelectors
        education={filters.education}
        language={filters.language}
        handleChange={handleChange}
      />
      <Pagination totalPages={totalPages} setPage={setPage} />
      <p className="py-0 mt-[-5px] mb-[18px] h-[5px] text-red-500 text-center">
        {errorMsg}
      </p>
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {volunteersShownOnPage?.map((volunteer: VolunteerTypeFromApi) => (
          <VolunteerItem key={volunteer.id} volunteer={volunteer} />
        ))}
      </div>
      <div className="mt-8">
        <Pagination totalPages={totalPages} setPage={setPage} />
      </div>
    </>
  );
}

export default VolunteerList;
