import { useNavigate } from 'react-router-dom';

type Props = {
  date: string | Date;
  timeslot: string;
  index: number;
  id: string | number;
  name: string;
};

function AvailRow({ date, timeslot, index, id, name }: Props) {
  const redirect = useNavigate();

  const navigateTo = () => {
    redirect(`/admin/volunteers/programs/${id}/${date}/${timeslot}/${name}`);
  };
  return (
    <>
      <tr className="table-normal border-b-2">
        <td className="font-bold">
          <span className="bg-blue-400 text-white rounded-full py-2 px-3 text-md">
            {index}
          </span>
        </td>
        <td>
          <div className="badge bg-green-500 border-none p-2 text-white text-md font-bold">
            {date as string}
          </div>
        </td>
        <td>
          <div
            className={`badge ${
              timeslot === 'Full day' ? 'bg-teal-500' : 'badge-error'
            } border-none text-white font-bold p-2 text-md`}
          >
            {timeslot}
          </div>
        </td>
        <td>
          <button onClick={navigateTo} className="btn btn-sm bg-blue-800">
            Programs
          </button>
        </td>
      </tr>
    </>
  );
}

export default AvailRow;
