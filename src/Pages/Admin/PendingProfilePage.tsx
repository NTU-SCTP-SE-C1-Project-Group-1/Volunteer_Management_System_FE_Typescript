import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import Spinner from '../../Assets/spinner.gif';

// API
import { getAllProfiles } from '../../CustomHooks/ApiActions';
// Type
import { ProfileType } from '../../CustomHooks/TypesAndStates';
// Child Component
import PendingProfile from '../../Components/Admin/Volunteers/PendingProfileInterview/PendingProfile';

function PendingProfilePage() {
  const { authUser } = useGlobalAuthContext();
  const [profiles, setProfiles] = useState<any>([]);

  // API to get all profiles
  const { isLoading } = useQuery({
    queryKey: ['profiles', authUser?.accessToken, authUser?.uid],
    queryFn: () => getAllProfiles(authUser?.accessToken, authUser?.uid),
    onSuccess: (data) => setProfiles(data),
    onError: (err) => console.log(err),
    select: (data) => {
      const inCompleteProfiles = data?.data.filter((profile: ProfileType) => {
        return (
          profile?.hobbies === '' ||
          profile?.interests === '' ||
          profile?.professionalExperience === ''
        );
      });
      return inCompleteProfiles;
    },
  });

  if (isLoading) {
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="Loading" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-auto md:min-h-[75vh] px-8 mt-32 mb-10">
      <h1 className="tracking-widest text-red-400">Incomplete Profiles</h1>
      <PendingProfile profiles={profiles.length > 0 ? profiles : []} />
    </div>
  );
}

export default PendingProfilePage;
