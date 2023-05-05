import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import Spinner from '../../Assets/spinner.gif';

// APIs
import { getProgramById } from '../../CustomHooks/ApiActions';
// Types
import { ProgramType } from '../../CustomHooks/TypesAndStates';

// Child Component
import ProgramEdit from '../../Components/Admin/Programs/ProgramEdit';

function ProgramEditPage() {
  const { id } = useParams();
  const { authUser } = useGlobalAuthContext();
  const [form, setForm] = useState<ProgramType>({} as ProgramType);

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

  // OnChange Handler
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // OnClick Edit
  const handleClickToEdit = (e: any) => {};

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
      />
    </div>
  );
}

export default ProgramEditPage;
