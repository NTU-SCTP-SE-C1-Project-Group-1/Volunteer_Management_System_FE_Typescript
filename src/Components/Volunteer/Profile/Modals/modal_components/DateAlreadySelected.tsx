import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unsetAvailabilityOfVolunteer } from '../../../../../CustomHooks/ApiActions';
import storage from '../../../../../CustomHooks/LocalStorage';
import { useGlobalAuthContext } from '../../../../../Context/AuthContext';

type Props = {
  value: string;
  showStatus: (status: string, date: string) => void;
};

function DateAlreadySelected({ value, showStatus }: Props) {
  const { authUser } = useGlobalAuthContext();
  let targetDate = new Date(value);
  const displayDate = new Date(targetDate)
    .toLocaleDateString('en-SG')
    .replaceAll('/', '-');
  // Api param
  const selectedDate = displayDate.split('-').reverse().join('-');
  // Get ID from localstorage
  const id = storage.get('id');
  // initialise queryClient
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: unsetAvailabilityOfVolunteer,
    onSuccess: (data) => {
      // console.log(data);
      showStatus('unmark', selectedDate);
      queryClient.invalidateQueries(['availabilities']);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const unSetAvail = () => {
    const params = {
      id: id as string,
      date: selectedDate,
      token: authUser?.accessToken,
    };
    // console.log(params);
    mutate(params);
  };

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle w-screen z-50">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">
            {value.substring(0, 16)}
          </h3>
          <p className="py-4 text-lg">
            You have already marked this date. Do you want to change it?
          </p>
          <div className="modal-action">
            <label
              onClick={unSetAvail}
              htmlFor="my-modal-4"
              className="btn btn-error text-white"
            >
              Unmarked date
            </label>
            <label htmlFor="my-modal-4" className="btn btn-primary">
              Ok, got it!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateAlreadySelected;
