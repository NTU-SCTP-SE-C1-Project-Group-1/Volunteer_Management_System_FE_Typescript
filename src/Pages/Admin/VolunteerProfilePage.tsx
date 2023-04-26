import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../Context/AuthContext';
// Child Component
import ProfileMain from '../../Components/Admin/Volunteers/SingleMemberPage/ProfileMain';
// APIs
import { getProfileById } from '../../CustomHooks/ApiActions';

function VolunteerProfilePage() {
  const { authUser } = useGlobalAuthContext();
  const { id } = useParams();

  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ['profile', authUser?.accessToken, id],
    queryFn: () => getProfileById(authUser?.accessToken, id as string),
    onSuccess: (data) => {
      console.log(data?.data);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
  console.log(profileResponse?.data.interests);
  if (isLoading) {
    <div className="h-[75vh] flex justify-center items-center">
      <h1>Loading...</h1>
    </div>;
  }
  return (
    <div className="flex flex-col w-full h-auto lg:w-[75vw] px-16 mt-28">
      <ProfileMain
        volunteer={profileResponse?.data.volunteer}
        profile={profileResponse?.data}
      />
    </div>
  );
}

export default VolunteerProfilePage;
