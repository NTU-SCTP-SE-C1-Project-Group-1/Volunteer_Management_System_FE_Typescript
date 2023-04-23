import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';

// API actions
import { getVolunteerById } from '../../CustomHooks/ApiActions';
import storage from '../../CustomHooks/LocalStorage';

function Profile() {
  const { id } = useParams();
  const { authUser } = useGlobalAuthContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['volunteer', id, authUser?.accessToken],
    queryFn: () => getVolunteerById(id, authUser?.accessToken),
  });

  useEffect(() => {
    storage.set('volunteer', data?.data);
  }, [data?.data]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  return <div>{data?.data.name}</div>;
}

export default Profile;
