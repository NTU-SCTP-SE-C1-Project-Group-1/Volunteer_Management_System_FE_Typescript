import { Link } from 'react-router-dom';

import {
  ProfileType,
  VolunteerTypeFromApi,
} from '../../../../CustomHooks/TypesAndStates';

type Props = {
  profiles: ProfileType[] | [];
};

function PendingProfile({ profiles }: Props) {
  const volunteers: VolunteerTypeFromApi[] = profiles?.map(
    (profile) => profile?.volunteer
  );
  return (
    <div>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th className="bg-blue-700 text-white">s/n</th>
            <th className="bg-blue-700 text-white">Name</th>
            <th className="bg-blue-700 text-white">DOB</th>
            <th className="bg-blue-700 text-white">Education</th>
            <th className="bg-blue-700 text-white">Occupation</th>
            <th className="bg-blue-700 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {volunteers?.map((volunteer: VolunteerTypeFromApi, index) => (
            <tr className="border-b-2" key={index}>
              <th>{index + 1}</th>
              <td className="text-blue-600 font-bold">
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={volunteer?.profilePicture}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{volunteer?.name}</div>
                    <div className="text-sm opacity-50">{volunteer?.email}</div>
                  </div>
                </div>
              </td>
              <td
                className={`${
                  volunteer?.dateOfBirth === '' ? 'text-red-600' : 'text-black'
                }`}
              >
                {volunteer?.dateOfBirth === ''
                  ? 'Not completed'
                  : (volunteer?.dateOfBirth as string)}
              </td>
              <td
                className={`${
                  volunteer?.education === '' ? 'text-red-600' : 'text-black'
                }`}
              >
                {volunteer?.education === ''
                  ? 'Not completed'
                  : volunteer?.education}
              </td>
              <td
                className={`${
                  volunteer?.occupation === '' ? 'text-red-600' : 'text-black'
                }`}
              >
                {volunteer?.occupation === ''
                  ? 'Not completed'
                  : volunteer?.occupation}
              </td>
              <td>
                <Link to={`/admin/volunteers/${volunteer?.id}`}>
                  <p className="btn btn-sm btn-primary">Interview</p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center">
        <Link to="/admin/dashboard">
          <p className="btn btn-sm">Back</p>
        </Link>
      </div>
    </div>
  );
}

export default PendingProfile;
