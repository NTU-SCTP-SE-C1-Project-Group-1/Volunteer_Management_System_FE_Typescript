import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import { useMutation } from '@tanstack/react-query';

// From API actions
import { signinAdmin } from '../../CustomHooks/ApiActions';
import storage from '../../CustomHooks/LocalStorage';

// Components
import IntroHeader from '../../Components/Public/SigninForm_Admin/IntroHeaderAdmin';
import FormLogo from '../../Components/Public/Reusables/FormLogo';
import SigninAdminForm from '../../Components/Public/SigninForm_Admin/SigninFormAdmin';

// Types & Interface
interface FormType {
  email: string;
  password: string;
}
const initialState: FormType = {
  email: '',
  password: '',
};

function SigninForAdmin() {
  const redirect = useNavigate();
  const {
    signInUserWithPwAndEmail,
    isLoggedIn,
    setIsLoggedIn,
    authUser,
    isAdmin,
    setIsAdmin,
  } = useGlobalAuthContext();
  const [form, setForm] = useState<FormType>(initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (form.email === '' || form.password === '') return;
    try {
      await signInUserWithPwAndEmail(form.email, form.password)
        .then(() => {
          storage.set('isLoggedIn', true);
          setIsLoggedIn(true);
        })
        .then(() => {
          storage.set('isAdmin', true);
          setIsAdmin(true);
        })
        .then(() => setForm(initialState));
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // React Query
  const { mutate } = useMutation({
    mutationFn: signinAdmin,
    onSuccess: () => {
      redirect('/admin/dashboard');
    },
  });

  useEffect(() => {
    const loggedInStatus = storage.get('isLoggedIn') as boolean;
    const adminStatus = storage.get('isAdmin') as boolean;
    if (loggedInStatus && adminStatus && authUser) {
      mutate(authUser?.uid);
      // console.log('The uid is ' + authUser?.uid);
    } else {
      console.log('There is no uid');
    }
  }, [isLoggedIn, authUser, isAdmin]);

  return (
    <div className="flex flex-col mt-28 w-[100%] h-auto md:h-[75vh] justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:mt-8 space-y-4 p-6 py-10 px-12 border border-gray-200 rounded-md shadow-lg">
        <IntroHeader />
        <SigninAdminForm
          form={form}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
        />
        <div className="flex flex-col justify-center items-center w-full">
          <FormLogo />
        </div>
      </div>
    </div>
  );
}

export default SigninForAdmin;
