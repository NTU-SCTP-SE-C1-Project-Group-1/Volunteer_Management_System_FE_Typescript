import axios from 'axios';
import { VolunteerType } from './TypesAndStates';

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
