import { BsPersonFillGear } from 'react-icons/bs';
import { VolunteerTypeFromApi } from '../../../CustomHooks/TypesAndStates';

type Props = {
  volunteer: VolunteerTypeFromApi;
};

function InfoTable({ volunteer }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-baseline space-x-3 w-[100%]">
        <BsPersonFillGear size={25} color={'pink'} />
        <h1 className="text-3xl md:text-2xl font-bold tracking-wider pb-2 text-pink-400">
          Personal Info
        </h1>
      </div>
      <hr className="border border-gray-300 w-[100%] mb-4" />
      <table>
        <tbody>
          <tr>
            <td className="w-[100px] md:w-[230px] py-2 font-semibold">
              Contact:{' '}
            </td>
            <td className="text-blue-700">{volunteer?.contact}</td>
          </tr>
          <tr>
            <td className="w-[100px] md:w-[230px] py-2 font-semibold">
              Email:{' '}
            </td>
            <td className="text-blue-700">{volunteer?.email}</td>
          </tr>
          <tr>
            <td className="w-[100px] md:w-[230px] py-2 font-semibold">
              Address:{' '}
            </td>
            <td className="text-blue-700">{volunteer?.address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InfoTable;
