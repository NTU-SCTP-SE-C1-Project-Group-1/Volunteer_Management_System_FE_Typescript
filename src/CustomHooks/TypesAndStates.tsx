// New Volunteer Registration State
export const FormInitialState = {
  name: '',
  email: '',
  contact: '',
  address: '',
  referrerName: '',
  referrerContact: '',
  occupation: '',
  profilePicture: '',
  dateOfBirth: '',
  education: '',
  hasCriminalRecord: false,
  language: '',
  language2: '',
  language3: '',
  pastExperience: '',
};

// Volunteer Type
export type VolunteerType = {
  name: string;
  email: string;
  contact: string;
  address: string;
  referrerName: string;
  referrerContact?: number | string;
  occupation: string;
  profilePicture: string;
  dateOfBirth: Date | string;
  education: string;
  hasCriminalRecord: boolean;
  language: string;
  language2: string;
  language3: string;
  pastExperience: string;
};

// Signin and register pw State
export type CredentialType = {
  email: string;
  password: string;
};
