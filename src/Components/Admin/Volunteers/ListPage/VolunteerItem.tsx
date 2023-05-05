import { useState } from 'react';
import { Link } from 'react-router-dom';
import { VolunteerTypeFromApi } from '../../../../CustomHooks/TypesAndStates';
import { useQuery } from '@tanstack/react-query';
import { getProfileById } from '../../../../CustomHooks/ApiActions';
import { useGlobalAuthContext } from '../../../../Context/AuthContext';

type Props = {
  volunteer: VolunteerTypeFromApi;
  key: string | number;
};

function VolunteerItem({ volunteer }: Props) {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const id = volunteer?.id.toLocaleString();
  const { authUser } = useGlobalAuthContext();
  let joinDate = volunteer?.createdAt as string;

  useQuery({
    queryKey: ['profile', authUser?.accessToken, id],
    queryFn: () => getProfileById(authUser?.accessToken, id),
    onError: (err: any) => console.log(err),
    onSuccess: (data) => {
      let profile = data?.data;
      let completionCheck = () => {
        return (
          profile?.interests !== '' &&
          profile?.professionalExperience !== '' &&
          profile?.hobbies !== '' &&
          profile.profilePicture !== ''
        );
      };
      setIsProfileComplete(() => completionCheck());
    },
  });

  return (
    <div className="card shadow-lg compact side bg-slate-100">
      <div className="flex-row  items-center space-x-24 md:space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-24 h-24 md:w-14 md:h-14">
              <img
                src={
                  volunteer?.profilePicture
                    ? volunteer?.profilePicture
                    : 'https://simg.nicepng.com/png/small/810-8105444_male-placeholder.png'
                }
                alt={volunteer?.name}
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title text-md lg:text-sm text-gray-700">
            {volunteer?.name}
          </h2>
          <p className="text-xs text-blue-600">
            Member since {joinDate.substring(0, 4)}
          </p>
          <Link
            className="text-base-content  text-opacity-70 hover:text-blue-500"
            to={`/admin/volunteers/${volunteer?.id}`}
          >
            View more
          </Link>
          {isProfileComplete ? (
            <p className="bg-blue-500 text-white text-center p-1 text-xs rounded-lg">
              Profile completed
            </p>
          ) : (
            <p className="bg-red-300 text-white text-center p-1 text-xs rounded-lg">
              Profile incomplete
            </p>
          )}

          <p className="bg-blue-300 text-white text-center p-1 text-xs rounded-lg mt-2 w-[60%]">
            Active
          </p>
        </div>
      </div>
    </div>
  );
}

export default VolunteerItem;
