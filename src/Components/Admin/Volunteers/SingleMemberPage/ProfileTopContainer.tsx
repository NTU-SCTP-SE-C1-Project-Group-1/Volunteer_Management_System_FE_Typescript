import { useNavigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../../../../Context/AuthContext';

// APIs
import { VolunteerTypeFromApi } from '../../../../CustomHooks/TypesAndStates';

interface Props {
  volunteer: VolunteerTypeFromApi;
  profilePicture: string;
  profileCompleted: () => boolean;
}

function ProfileTopContainer({
  volunteer,
  profilePicture,
  profileCompleted,
}: Props) {
  const redirect = useNavigate();
  const { authUser } = useGlobalAuthContext();
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8 w-[75vw]">
        <div className="custom-card-image mb-6 md:mb-0">
          <div className="rounded-3xl image-full">
            <figure>
              <div className="flex justify-center items-center">
                <img
                  className="rounded-3xl h-[300px] w-[300px] md:h-[35vh] md:w-[20vw]"
                  src={
                    volunteer?.profilePicture !== ''
                      ? volunteer?.profilePicture
                      : profilePicture === ''
                      ? 'https://simg.nicepng.com/png/small/810-8105444_male-placeholder.png'
                      : profilePicture
                  }
                  alt="profile"
                />
              </div>
            </figure>
          </div>
          <div className="flex justify-center items-center p-2">
            <button
              onClick={() =>
                redirect(`/admin/volunteers/edit/${volunteer?.id}`)
              }
              className="btn btn-primary btn-sm"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl card-title">
              {volunteer?.name}
              <div className="ml-2 mr-1 badge badge-info text-white">
                Active
              </div>
              <div
                className={`mx-1 w-[140px] badge ${
                  profileCompleted() ? 'badge-info' : 'badge-error'
                } text-white`}
              >
                {profileCompleted()
                  ? 'Profile Completed'
                  : 'Incomplete Profile'}
              </div>
            </h1>

            <div className="mt-4 card-actions text-2xl font-bold tracking-widest text-blue-500">
              Personal Information
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row h-auto rounded-lg shadow-md bg-base-100 stats">
            <div className="stat">
              <div className="stat-title text-md">Address</div>
              <div className="text-sm stat-value">{volunteer?.address}</div>
            </div>
            <div className="stat">
              <div className="stat-title text-md">Occupation</div>
              <div className="text-sm stat-value">
                <p>
                  {volunteer?.occupation
                    ? volunteer.occupation
                    : 'Did not indicate'}
                </p>
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-md">Education</div>
              <div className="text-sm stat-value">{volunteer?.education}</div>
            </div>

            <div className="stat">
              <div className="stat-title text-md">Criminal Records</div>
              <div className="text-sm stat-value">
                {volunteer?.hasCriminalRecord ? 'Yes' : 'No'}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row h-auto rounded-lg shadow-md bg-base-100 stats">
            <div className="stat">
              <div className="stat-title text-md">Email</div>
              <div className="text-sm stat-value">{volunteer?.email}</div>
            </div>
            <div className="stat">
              <div className="stat-title text-md">Contact</div>
              <div className="text-sm stat-value">{volunteer?.contact}</div>
            </div>
            <div className="stat">
              <div className="stat-title text-md">Date of Birth</div>
              <div className="text-sm stat-value">
                {volunteer?.dateOfBirth as string}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-md">Referral</div>
              <div className="text-sm stat-value">
                {volunteer?.referrerName} {volunteer?.referrerContact}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileTopContainer;
