import { useNavigate } from 'react-router-dom';
import { VolunteerTypeFromApi } from '../../../../CustomHooks/TypesAndStates';

type Props = {
  availVounteersNotEnrolledYet: VolunteerTypeFromApi[];
};

function VolunteersWithMatchDatesTable({
  availVounteersNotEnrolledYet,
}: Props) {
  const redirect = useNavigate();
  return (
    <div className="pt-4 h-auto">
      <p className="text-blue-500 font-bold text-2xl">
        Propspective volunteers with matching dates
      </p>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {availVounteersNotEnrolledYet?.map((volunteer, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={volunteer?.profilePicture}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{volunteer?.name}</td>

                <th>
                  <button
                    onClick={() =>
                      redirect(`/admin/volunteers/${volunteer?.id}`)
                    }
                    className="btn btn-ghost btn-xs"
                  >
                    details
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default VolunteersWithMatchDatesTable;
