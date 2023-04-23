import { useParams } from 'react-router-dom';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';

// API actions
import { getVolunteerById } from '../../CustomHooks/ApiActions';

function Profile() {
  const { id } = useParams();
  const { authUser } = useGlobalAuthContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['volunteer', id, authUser?.accessToken],
    queryFn: () => getVolunteerById(id, authUser?.accessToken),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  //   console.log(data?.data);

  return <div>{data?.data.name}</div>;
}

export default Profile;
