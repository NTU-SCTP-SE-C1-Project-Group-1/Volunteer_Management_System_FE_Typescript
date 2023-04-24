import axios from 'axios';
import { VolunteerType, AvailabilityType } from './TypesAndStates';

// BASE URL
export const BASE_URL = process.env.REACT_APP_BASE_URL;

// Create new volunteer
export const createNewVolunteer = async (
  newVolunteer: VolunteerType,
  uid: string
) => {
  const response = await axios.post(
    `${BASE_URL}api/signup?uid=${uid}`,
    newVolunteer
  );
  console.log(response.data);
};

// Sign-in Volunteer
export const signInVolunteer = async (uid: string) => {
  return await axios.post(`${BASE_URL}api/signin`, {
    uid: uid,
  });
};

// Sign-in Admin
export const signinAdmin = async (uid: string) => {
  return await axios.post(`${BASE_URL}api/admin/signin`, {
    uid: uid,
  });
};

// Sign-out Volunteer/Admin
export const signOutUser = async (uid: string) => {
  await axios.post(`${BASE_URL}api/signout`, {
    uid: uid,
  });
};

// Get Volunteer by ID
export const getVolunteerById = async (
  id: string | undefined,
  token: string
) => {
  return await axios.get(`${BASE_URL}admin/volunteers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get Availabilities of a Volunteer by ID
export const getAvailabilitiesOfVolunteer = async (
  id: string | undefined,
  token: string
) => {
  return await axios.get(`${BASE_URL}volunteers/availabilities/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get Enrolments of a Volunteer by ID
export const getEnrolmentsOfVolunteer = async (
  id: string | undefined,
  token: string
) => {
  return await axios.get(`${BASE_URL}volunteers/${id}/enrolments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// *** useMutation only accepts one param, hence, u need to wrap multiple params in an obj
type paramsForNewAvail = {
  id: string;
  date: string;
  timeslot: string;
  token: string;
};

// Set new availability of a volunteer
export const setNewAvailabilityOfVolunteer = async ({
  id,
  date,
  timeslot,
  token,
}: paramsForNewAvail) => {
  return await axios.post(
    `${BASE_URL}volunteers/availability/${id}?date=${date}&timeslot=${timeslot}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// remove availability of a volunteer
export const unsetAvailabilityOfVolunteer = async (
  id: string,
  date: string
) => {
  return await axios.delete(
    `${BASE_URL}volunteers/availability/${id}?date=${date}`
  );
};
