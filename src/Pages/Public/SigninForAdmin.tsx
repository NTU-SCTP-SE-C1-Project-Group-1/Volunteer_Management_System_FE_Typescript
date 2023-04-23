import { useState } from 'react';

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
  const [form, setForm] = useState<FormType>(initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };
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
