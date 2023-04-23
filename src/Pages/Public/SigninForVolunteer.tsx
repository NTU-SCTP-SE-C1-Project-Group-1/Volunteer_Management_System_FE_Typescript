import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import { useMutation } from '@tanstack/react-query';

// From API actions
import { signInVolunteer } from '../../CustomHooks/ApiActions';

// Components
import IntroHeader from '../../Components/Public/SigninForm_Volunteer/IntroHeaderVolunteer';
import SigninForm from '../../Components/Public/SigninForm_Volunteer/SigninFormVolunteer';
import FormLogo from '../../Components/Public/Reusables/FormLogo';

// Types & Interface
interface FormType {
  email: string;
  password: string;
}
const initialState: FormType = {
  email: '',
  password: '',
};

// React Functional Component
function SigninForVolunteer() {
  const redirect = useNavigate();
  const { signInUserWithPwAndEmail, isLoggedIn, setIsLoggedIn, authUser } =
    useGlobalAuthContext();
  const [form, setForm] = useState<FormType>(initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Form on change
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form on submit - signin user and get uid from firebase
  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (form.email === '' || form.password === '') return;
    try {
      signInUserWithPwAndEmail(form.email, form.password);
      setForm(initialState);
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Function call to signin user in Springboot
  const { mutate } = useMutation({
    mutationFn: signInVolunteer,
    onSuccess: (data) => {
      // console.log(data?.data?.volunteer.id);
      const id = data?.data?.volunteer.id;
      redirect(`/volunteer/profile/${id}`);
    },
  });

  useEffect(() => {
    if (isLoggedIn && authUser) {
      // console.log('The uid is ' + authUser?.uid);
      mutate(authUser?.uid);
    } else {
      console.log('There is no authuser present');
    }
  }, [authUser, isLoggedIn]);

  return (
    <div className="flex flex-col mt-28 w-[100%] h-auto md:h-[75vh] justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:mt-8 space-y-2 p-6 py-4 px-12 border border-gray-200 rounded-md shadow-lg">
        <IntroHeader />
        <div className="flex flex-col justify-center items-center w-full">
          <SigninForm
            onSubmitHandler={onSubmitHandler}
            onChangeHandler={onChangeHandler}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            form={form}
          />
          <FormLogo />
        </div>
      </div>
    </div>
  );
}

export default SigninForVolunteer;
