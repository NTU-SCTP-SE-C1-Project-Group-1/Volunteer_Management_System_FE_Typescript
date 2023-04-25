import { BsPersonFillGear } from 'react-icons/bs';
import { VolunteerTypeFromApi } from '../../../CustomHooks/TypesAndStates';

type Props = {
  volunteer: VolunteerTypeFromApi;
};
function ProfileTable({ volunteer }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-baseline space-x-3 w-[100%]">
        <BsPersonFillGear size={25} color={'blue'} />
        <h1 className="text-3xl md:text-2xl font-bold tracking-wider pb-2 text-blue-400">
          Profile
        </h1>
      </div>

      <hr className="border border-gray-300 w-[100%] mb-4" />
      <table className="text-lg">
        <tbody>
          <tr>
            <td className="w-[100px] md:w-[230px] py-2 font-semibold">
              Languages:{' '}
            </td>
            <td className="text-blue-700">
              {volunteer?.language}{' '}
              {volunteer?.language2 ? ', ' + volunteer?.language2 : ''}
              {volunteer?.language3 ? ', ' + volunteer?.language3 : ''}
            </td>
          </tr>
          <tr>
            <td className="w-[100px] md:w-[230px] py-1 font-semibold">
              Interests:{' '}
            </td>
            <td className="text-blue-700">none</td>
          </tr>
          <tr>
            <td className="w-[100px] md:w-[230px] py-1 font-semibold">
              Experience:{' '}
            </td>
            <td className="text-blue-700"> {volunteer?.pastExperience}</td>
          </tr>
          <tr>
            <td className="w-[100px] md:w-[230px] py-1 font-semibold">
              Education:{' '}
            </td>
            <td className="text-blue-700">{volunteer?.education}</td>
          </tr>
          <tr>
            <td className="w-[100px] md:w-[230px] py-1 font-semibold">
              Occupation:{' '}
            </td>
            <td className="text-blue-700">{volunteer?.occupation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProfileTable;
