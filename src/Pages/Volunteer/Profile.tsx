import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';

// Child components
import ProfileImage from '../../Components/Volunteer/Profile/ProfileImage';
import CalendarComponent from '../../Components/Volunteer/Profile/Calendar';
import InfoTable from '../../Components/Volunteer/Profile/InfoTable';
import ProfileTable from '../../Components/Volunteer/Profile/ProfileTable';
import ControlButtons from '../../Components/Volunteer/Profile/ControlButtons';

// Modals components
import AvailabilitySelectionModal from '../../Components/Volunteer/Profile/Modals/AvailabilitySelectionModal';
import ProgramsEnrolledModal from '../../Components/Volunteer/Profile/Modals/ProgramsEnrolledModal';
import AvailabilitiesOfVolunteer from '../../Components/Volunteer/Profile/Modals/AvailabilitiesOfVolunteer';

// API actions
import {
  getVolunteerById,
  getAvailabilitiesOfVolunteer,
  getEnrolmentsOfVolunteer,
} from '../../CustomHooks/ApiActions';

// Localstorage Hook
import storage from '../../CustomHooks/LocalStorage';

function Profile() {
  const { id } = useParams();
  const [value, onChange] = useState<Date | null | (Date | null)[]>(new Date());
  const { authUser } = useGlobalAuthContext();

  // API - get volunteer by id
  const {
    data: volunteer,
    isLoading: volunteerIsLoading,
    isError: volunteerIsError,
  } = useQuery({
    queryKey: ['volunteer', id, authUser?.accessToken],
    queryFn: () => getVolunteerById(id, authUser?.accessToken),
  });

  // API - get availabilities of a volunteer
  const { data: availabilities } = useQuery({
    queryKey: ['availabilities', id, authUser?.accessToken],
    queryFn: () => getAvailabilitiesOfVolunteer(id, authUser?.accessToken),
  });

  // API - get enrolments of a volunteer
  const { data: enrolments } = useQuery({
    queryKey: ['enrolments', id, authUser?.accessToken],
    queryFn: () => getEnrolmentsOfVolunteer(id, authUser?.accessToken),
  });

  useEffect(() => {
    storage.set('id', volunteer?.data.id || '');
  }, [volunteer?.data]);

  if (volunteerIsLoading)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  if (volunteerIsError)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <h1>Error...</h1>
      </div>
    );

  return (
    <div className="flex flex-col h-auto lg:h-[75vh] mt-32 lg:flex-row lg:space-x-3">
      {/* Column 1 */}
      <div className="md:px-10 md:py-6">
        <ProfileImage
          photo={volunteer?.data.profilePicture}
          name={volunteer?.data.name}
          date={volunteer?.data.createdAt}
        />
        <CalendarComponent
          value={value}
          onChange={onChange}
          showWeekNumbers={true}
        />
      </div>
      {/* Column 2 */}
      <div className="px-28 lg:w-[50%] lg:px-20 space-y-4 mt-2">
        <InfoTable volunteer={volunteer?.data} />
        <ProfileTable volunteer={volunteer?.data} />
        <ControlButtons />
      </div>
      {/* MODALS */}
      <AvailabilitySelectionModal
        value={value}
        availabilities={availabilities?.data}
        id={id}
      />
      <ProgramsEnrolledModal enrolments={enrolments?.data} />
      <AvailabilitiesOfVolunteer availabilities={availabilities?.data} />
    </div>
  );
}

export default Profile;
