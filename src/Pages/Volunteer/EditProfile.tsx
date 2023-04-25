import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditProfileForm from '../../Components/Volunteer/EditProfile/EditProfileForm';
import { FormInitialState } from '../../CustomHooks/TypesAndStates';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getVolunteerById } from '../../CustomHooks/ApiActions';
import { editVolunteer } from '../../CustomHooks/ApiActions';

function EditProfile() {
  const redirect = useNavigate();
  const { authUser } = useGlobalAuthContext();
  const { id } = useParams();
  const [form, setForm] = useState(FormInitialState);

  // API - get volunteer by id
  const { isLoading: volunteerIsLoading } = useQuery({
    queryKey: ['volunteer', id, authUser?.accessToken],
    queryFn: () => getVolunteerById(id, authUser?.accessToken),
    refetchInterval: 360000,
    onSuccess: (data) => {
      //   console.log(data?.data);
      setForm(data?.data);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  // Initialise queryClient
  const queryClient = useQueryClient();

  // API - To edit volunteer
  const { mutate } = useMutation({
    mutationFn: editVolunteer,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log(data?.data);
      queryClient.invalidateQueries(['volunteer']);
      redirect(`/volunteer/profile/${id}`);
    },
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandlerToEdit = () => {
    if (
      form.name === '' ||
      form.email === '' ||
      form.contact === '' ||
      form.address === ''
    )
      return;
    const params = {
      id: id,
      volunteer: form,
      token: authUser?.accessToken,
    };
    mutate(params);
  };

  if (volunteerIsLoading)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      <h2 className="mt-28 sm:mt-36 md:mt-32 text-center tracking-wider text-gray-600">
        Edit Personal Infomation
      </h2>
      <div className="flex flex-col w-screen h-auto justify-center items-center">
        <EditProfileForm
          {...form}
          changeHandler={changeHandler}
          submitHandlerToEdit={submitHandlerToEdit}
        />
      </div>
    </>
  );
}

export default EditProfile;
