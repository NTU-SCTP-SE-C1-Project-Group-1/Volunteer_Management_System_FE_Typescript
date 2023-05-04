import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalAuthContext } from '../../Context/AuthContext';

//  Child Component
import NewProgram from '../../Components/Admin/Programs/NewProgram';

// APIs
import { createNewProgram } from '../../CustomHooks/ApiActions';

// Initialstate & Type
import {
  newProgramInitialState,
  NewProgramType,
} from '../../CustomHooks/TypesAndStates';

function CreateProgram() {
  const redirect = useNavigate();
  const { authUser } = useGlobalAuthContext();
  const [form, setForm] = useState<NewProgramType>(newProgramInitialState);
  const [error, setError] = useState<string>('');

  const changeHandler = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNewProgram,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['enrolments']);
      redirect('/admin/programs');
    },
    onError: (err: any) => {
      console.log(err);
      setError(err.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    },
  });

  const onClickToCreateNewProgram = () => {
    const params = {
      token: authUser?.accessToken,
      program: form,
    };
    mutate(params);
  };

  return (
    <div className="flex flex-col min-h-[75vh] h-auto md:h-auto md:min-h-screen justify-center items-center md:mt-12">
      <h1 className="font-bold text-4xl tracking-wider">Program Kickstarter</h1>
      <p className="py-0 h-[3px] text-red-500 text-center">{error}</p>
      <NewProgram
        changeHandler={changeHandler}
        form={form}
        onClickToCreateNewProgram={onClickToCreateNewProgram}
      />
    </div>
  );
}

export default CreateProgram;
