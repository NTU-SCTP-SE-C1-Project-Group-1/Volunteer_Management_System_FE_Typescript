import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';

// Child components
import ProfileImage from '../../Components/Volunteer/Profile/ProfileImage';

// API actions
import { getVolunteerById } from '../../CustomHooks/ApiActions';
// Localstorage Hook
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

  return (
    <div>
      <ProfileImage
        photo={data?.data.profilePicture}
        name={data?.data.name}
        date={data?.data.createdAt}
      />
    </div>
  );
}

export default Profile;
