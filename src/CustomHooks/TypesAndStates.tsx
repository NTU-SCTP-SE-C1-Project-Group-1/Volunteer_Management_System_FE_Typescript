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

// Volunteer Type - from springboot
export type VolunteerTypeFromApi = {
  id: number;
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
  createdAt: string | Date;
};

// Availability Type - from springboot
export type AvailabilityType = {
  id: number;
  date: Date | string;
  avail: boolean;
  timeslot: string;
  createdAt: Date | string;
  volunteer: VolunteerTypeFromApi;
};

// Program Type - from springboot
export type ProgramType = {
  id: number;
  name: string;
  date: Date | string;
  description: string;
  photo: string;
  timeOfProgram: string;
  volunteersRequired: number;
  noOfVolunteers: number;
  createdAt: Date | string;
};

// Enrolment Type - from springboot
export type EnrolmentType = {
  id: number;
  date: Date | string;
  timeOfProgram: string;
  program: ProgramType;
};

// Profile Type - from springboot
export type ProfileType = {
  id: number;
  interests: string;
  hobbies: string;
  professionalExperience: string;
  profilePicture: string;
  createdAt: Date | string;
  volunteer: VolunteerTypeFromApi;
};

// Signin and register pw State
export type CredentialType = {
  email: string;
  password: string;
};

// Children Type of React Elements
export interface ChildrenElementProp {
  children: React.ReactElement;
}
