import axios from 'axios';

// Types
import { VolunteerType, NewProgramType, ProgramType } from './TypesAndStates';

// Local Storage Hook
import storage from './LocalStorage';

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

// Get all volunteers
export const getAllVolunteers = async (token: string) => {
  return await axios.get(`${BASE_URL}admin/volunteers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

// Get all Profiles
export const getAllProfiles = async (token: string, uid: string) => {
  return await axios.get(
    `${BASE_URL}admin/volunteers/profiles/all?UID=${uid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get Profile by ID
export const getProfileById = async (token: string, id: string) => {
  return await axios.get(`${BASE_URL}admin/volunteers/profiles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type editVolunteerTypeParams = {
  id: string | undefined;
  volunteer: VolunteerType;
  token: string;
};

// Edit ProfileType
type editProfileType = {
  interests: string;
  hobbies: string;
  professionalExperience: string;
  profilePicture: string;
};

type body = {
  token: string;
  id: string;
  reqBody: editProfileType;
};

// Edit Profile of Volunteer
export const editProfileById = async ({ token, id, reqBody }: body) => {
  return await axios.put(
    `${BASE_URL}admin/volunteers/profiles/${id}/edit`,
    reqBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Edit a volunteer
export const editVolunteer = async ({
  id,
  volunteer,
  token,
}: editVolunteerTypeParams) => {
  return await axios.put(`${BASE_URL}volunteers/${id}`, volunteer, {
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

type getVolunteersInEnrolType = {
  token: string;
  id: string;
};

// Get Volunteers enrolled in an Enrolment by Program Id
export const getVolunteersInEnrolment = async ({
  token,
  id,
}: getVolunteersInEnrolType) => {
  return await axios.get(
    `${BASE_URL}admin/enrolments/volunteers?program_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get All enrolments
export const getAllEnrolments = async (token: string) => {
  return await axios.get(`${BASE_URL}admin/enrolments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type enrolVolunteerProps = {
  token: string;
  volunteerId: string;
  programId: string | number;
};

// Get Program by ID
export const getProgramById = async (token: string, programId: string) => {
  return axios.get(`${BASE_URL}admin/programs/${programId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type updateProgramType = {
  token: string;
  programId: string;
  program: ProgramType;
};

// update Program
export const updateProgram = async ({
  token,
  programId,
  program,
}: updateProgramType) => {
  return axios.put(`${BASE_URL}admin/programs/${programId}`, program, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Enrol a volunteer into program
export const enrolVolunteer = async ({
  token,
  volunteerId,
  programId,
}: enrolVolunteerProps) => {
  return await axios.post(
    `${BASE_URL}admin/enrolments/volunteers?volunteer_id=${volunteerId}&program_id=${programId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

type unenrolVolunteerType = {
  volunteerId: string;
  programId: string;
  token: string;
};

// Unenrol a volunteer from a program
export const unenrolVolunteer = async ({
  volunteerId,
  programId,
  token,
}: unenrolVolunteerType) => {
  return await axios.put(
    `${BASE_URL}admin/enrolments/unenrol?volunteerId=${volunteerId}&programId=${programId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get all availabilities
export const getAllAvailabilities = async (token: string) => {
  return await axios.get(`${BASE_URL}volunteers/availability/all`, {
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

type updateAvailType = {
  token: string;
  volunteerId: string;
  date: string;
  isAvail: boolean;
};

export const updateAvailabilityOfVolunteer = async ({
  token,
  volunteerId,
  date,
  isAvail,
}: updateAvailType) => {
  return await axios.put(
    `${BASE_URL}volunteers/availability/${volunteerId}?date=${date}&isAvail=${isAvail}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

type unsetParams = {
  id: string;
  date: string | Date;
  token: string;
};

// remove availability of a volunteer
export const unsetAvailabilityOfVolunteer = async ({
  id,
  date,
  token,
}: unsetParams) => {
  return await axios.delete(
    `${BASE_URL}volunteers/availability/${id}?date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

interface searchParamsType {
  token: string;
  experience: string;
  education: string;
  language: string;
}

// Search Volunteers by Params
export const searchVolunteersByParams = async ({
  token,
  experience,
  education,
  language,
}: searchParamsType) => {
  return await axios.get(
    `${BASE_URL}admin/volunteers/search?experience=${experience}&education=${education}&language=${language}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

type createProgramType = {
  token: string;
  program: NewProgramType;
};

// Create new program
export const createNewProgram = async ({
  token,
  program,
}: createProgramType) => {
  return await axios.post(`${BASE_URL}admin/newprogram`, program, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Reload Page on expired token
export const reload = (err: any, authUser: unknown) => {
  const isLoggedIn = storage.get('isLoggedIn') as boolean;
  console.log(err);
  if (err?.response.status === 401) {
    if (isLoggedIn && authUser) {
      window.location.reload();
    } else {
      return;
    }
  }
};
