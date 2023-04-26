import { Link } from 'react-router-dom';

// Child Components
import ProfileTopContainer from './ProfileTopContainer';
import ProfileSecondaryContainer from './ProfileSecondaryContainer';
import EventsTable from './EventsTable';
import AvailabilityTable from './AvailabilityTable';

// Types
import {
  VolunteerTypeFromApi,
  ProfileType,
  EnrolmentType,
  AvailabilityType,
} from '../../../../CustomHooks/TypesAndStates';

interface Props {
  volunteer: VolunteerTypeFromApi;
  profile: ProfileType;
  enrolments: EnrolmentType[];
  availabilities: AvailabilityType[];
}

function ProfileMain({
  volunteer,
  profile,
  enrolments,
  availabilities,
}: Props) {
  const profileCompleted: boolean = false;
  const interests = profile?.interests || ('' as string);
  const hobbies = profile?.hobbies || ('' as string);
  const professionalExperience =
    profile?.professionalExperience || ('' as string);
  const profilePicture = profile?.profilePicture || ('' as string);

  return (
    <>
      <div className="mb-4">
        <Link to="/admin/volunteers" className="btn btn-ghost">
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
      <EventsTable enrolments={enrolments} />
      {/* AVAILABILITY TABLE */}
      <AvailabilityTable
        availabilities={availabilities}
        id={volunteer?.id}
        name={volunteer?.name}
      />
    </>
  );
}

export default ProfileMain;
