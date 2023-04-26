import { Link, useNavigate } from 'react-router-dom';

// Child Components
import ProfileTopContainer from './ProfileTopContainer';
import ProfileSecondaryContainer from './ProfileSecondaryContainer';
import EventsTable from './EventsTable';
import AvailabilityTable from './AvailabilityTable';

// Types
import {
  VolunteerTypeFromApi,
  ProfileType,
} from '../../../../CustomHooks/TypesAndStates';

interface Props {
  volunteer: VolunteerTypeFromApi;
  profile: ProfileType;
}

function ProfileMain({ volunteer, profile }: Props) {
  const profileCompleted: boolean = false;
  const interests = profile?.interests || ('' as string);
  const hobbies = profile?.hobbies || ('' as string);
  const professionalExperience =
    profile?.professionalExperience || ('' as string);
  const profilePicture = profile?.profilePicture || ('' as string);
  //   const { interests, hobbies, professionalExperience, profilePicture } =
  //     profile;

  return (
    <>
      <div className="mb-4">
        <Link to="/admin/main/editvolunteer" className="btn btn-ghost">
          Back To Search
        </Link>
      </div>

      <ProfileTopContainer
        volunteer={volunteer}
        profilePicture={profilePicture}
        profileCompleted={profileCompleted}
      />

      <ProfileSecondaryContainer
        volunteer={volunteer}
        interests={interests}
        hobbies={hobbies}
        professionalExperience={professionalExperience}
      />

      {/* UPCOMING EVENTS TABLE */}
 

      {/* AVAILABILITY TABLE */}
      {/* {availabilities &&
          listOfConfirmAvails?.length !== 0 &&
          nonExpiredAvailabilities.length !== 0 ? (
            <VolunteerAvailabilities
              availabilities={nonExpiredAvailabilities}
              name={volunteer?.name}
              id={id}
            />
          ) : (
            <>
              <div className="flex justify-start items-center rounded-lg  mt-8">
                <h1 className="font-bold tracking-widest text-2xl ml-2 text-blue-500">
                  Volunteer's Availability
                </h1>
              </div>
              <div className="flex justify-start items-center p-4">
                <h1 className="text-md text-error font-bold">
                  Please note that volunteer don't have any available dates
                </h1>
              </div>
            </>
          )} */}
    </>
  );
}

export default ProfileMain;
