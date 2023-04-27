import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../Context/AuthContext';

// Child Component
import ProfileEdit from '../../Components/Admin/Volunteers/SingleMemberPage/ProfileEdit';

// APIs
import { getProfileById, reload } from '../../CustomHooks/ApiActions';

function VolunteerEditProfile() {
  const { id } = useParams();
  const { authUser } = useGlobalAuthContext();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', authUser?.accessToken, id],
    queryFn: () => getProfileById(authUser?.accessToken, id as string),
    onError: (err) => reload(err, authUser),
  });

  if (isLoading)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="flex flex-col h-auto md:h-[75vh] justify-center items-center mt-24">
      <ProfileEdit profile={profile?.data} id={id as string} />
    </div>
  );
}

export default VolunteerEditProfile;
