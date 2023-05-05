import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import Spinner from '../../Assets/spinner.gif';

// APIs
import { getProgramById, updateProgram } from '../../CustomHooks/ApiActions';
// Types
import { ProgramType } from '../../CustomHooks/TypesAndStates';

// Child Component
import ProgramEdit from '../../Components/Admin/Programs/ProgramEdit';

function ProgramEditPage() {
  const { id } = useParams();
  const redirect = useNavigate();
  const { authUser } = useGlobalAuthContext();
  const [form, setForm] = useState<ProgramType>({} as ProgramType);
  const [error, setError] = useState<string>('');

  // API to get program
  const { data: program, isLoading } = useQuery({
    queryKey: ['program', authUser?.accessToken, id],
    queryFn: () => getProgramById(authUser?.accessToken, id as string),
    onSuccess: (data) => {
      setForm({
        ...data?.data,
        date: (data?.data.date as string).split('-').reverse().join('-'),
      });
    },
    onError: (err) => console.log(err),
  });

  // API update program
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProgram,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['program', 'enrolments']);
      redirect(`/admin/programs/${id}`);
    },
    onError: (err: any) => {
      console.log(err);
      setError(err.message);
    },
  });

  // OnChange Handler
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // OnClick Edit
  const handleClickToEdit = () => {
    const params = {
      token: authUser?.accessToken,
      programId: id as string,
      program: form,
    };
    mutate(params);
  };

  if (isLoading)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="Loading" />
      </div>
    );

  return (
    <div className="flex flex-col h-auto md:h-screen p-8 items-center">
      <h3 className="text-4xl font-bold mt-24">Edit Program</h3>
      <ProgramEdit
        id={id as string}
        form={form}
        handleChange={handleChange}
        handleClickToEdit={handleClickToEdit}
        error={error}
      />
    </div>
  );
}

export default ProgramEditPage;
