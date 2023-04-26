import { MdOutlineInterests } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { MdInterests } from 'react-icons/md';
import { MdOutlineLanguage } from 'react-icons/md';
import { IoBagHandleSharp } from 'react-icons/io5';

import { VolunteerTypeFromApi } from '../../../../CustomHooks/TypesAndStates';

interface Props {
  volunteer: VolunteerTypeFromApi;
  interests: string;
  professionalExperience: string;
  hobbies: string;
}

function ProfileSecondaryContainer({
  volunteer,
  interests,
  professionalExperience,
  hobbies,
}: Props) {
  return (
    <>
      <div className="flex flex-col py-5 rounded-lg shadow-md bg-base-100 stats p-3 ml-[-30px] md:ml-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* COLUMN 1 */}
          <div className="flex flex-col pb-8">
            <div className="flex justify-start space-y-1">
              <FaUserFriends size={50} color={'skyblue'} />
              <h1 className="text-3xl pl-2">Volunteering Experience</h1>
            </div>
            <p
              className={`w-[90%] ${
                volunteer?.pastExperience !== '' || null
                  ? 'text-blue-600'
                  : 'text-error'
              } pt-3`}
            >
              {volunteer?.pastExperience !== '' || null
                ? volunteer?.pastExperience
                : 'Not completed'}
            </p>
          </div>
          {/* COLUMN 2 */}
          <div className="flex flex-col pb-8">
            <div className="flex justify-start space-y-1">
              <MdOutlineInterests size={50} color={'skyblue'} />
              <h1 className="text-3xl pl-2">Interests</h1>
            </div>
            <p
              className={`w-[90%] ${
                interests ? 'text-blue-600' : 'text-error'
              } pt-3`}
            >
              {interests ? interests : 'Not completed'}
            </p>
          </div>
          {/* COLUMN 3 */}
          <div className="flex flex-col pb-8">
            <div className="flex justify-start space-y-1">
              <MdInterests size={50} color={'skyblue'} />
              <h1 className="text-3xl pl-2">Hobbies</h1>
            </div>
            <p
              className={`w-[90%] ${
                hobbies ? 'text-blue-600' : 'text-error'
              } pt-3`}
            >
              {hobbies ? hobbies : 'Not completed'}
            </p>
          </div>
          <div className="flex flex-col pb-8">
            <div className="flex justify-start space-y-1">
              <MdOutlineLanguage size={50} color={'skyblue'} />
              <h1 className="text-3xl pl-2">Languages</h1>
            </div>
            <p
              className={`w-[90%] ${
                volunteer?.language !== '' || null
                  ? 'text-blue-600'
                  : 'text-error'
              } pt-3`}
            >{`${
              volunteer?.language === '' ? 'Not completed' : volunteer?.language
            } ${
              volunteer?.language2 !== '' ? ', ' + volunteer?.language2 : ''
            } ${
              volunteer?.language3 !== '' ? ', ' + volunteer?.language3 : ''
            }`}</p>
          </div>
          <div className="flex flex-col pb-8">
            <div className="flex justify-start space-y-1">
              <IoBagHandleSharp size={50} color={'skyblue'} />
              <h1 className="text-3xl pl-2">Professional Experience</h1>
            </div>
            <p
              className={`w-[90%] ${
                professionalExperience !== '' ? 'text-blue-600' : 'text-error'
              } pt-3`}
            >
              {professionalExperience !== ''
                ? professionalExperience
                : 'Not completed'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSecondaryContainer;
