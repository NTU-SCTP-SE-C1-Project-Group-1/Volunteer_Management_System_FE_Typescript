import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResetForm from '../../Components/Volunteer/ResetPassword/ResetForm';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import storage from '../../CustomHooks/LocalStorage';

function ResetPassword() {
  const redirect = useNavigate();
  const { passwordReset } = useGlobalAuthContext();
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [failureMsg, setFailureMsg] = useState<string>('');
  const id = storage.get('id') as string;

  const showPasswordChangeStatus = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        setSuccessMsg(() => 'Password successfully changed!');
        setTimeout(() => setSuccessMsg(() => ''), 3000);
        break;
      case 'FAIL':
        setFailureMsg(() => 'Password change unsuccessful! Please check again');
        setTimeout(() => setFailureMsg(() => ''), 3000);
        break;
      default:
        return;
    }
  };

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password.length < 7) return;
    try {
      passwordReset(password)
        .then(() => {
          showPasswordChangeStatus('SUCCESS');
        })
        .then(() => setPassword(() => ''));
    } catch (err) {
      console.log(err);
      showPasswordChangeStatus('FAIL');
    }
  };

  return (
    <div className="h-auto md:h-screen px-28 py-4 mt-2">
      <div className="flex flex-col justify-center items-center w-full mt-20">
        <h1 className="text-4xl p-4 font-bold">Password Reset</h1>
        <ResetForm
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onSubmitHandler={onSubmitHandler}
        />
        <button
          onClick={() => redirect(`/volunteer/profile/${id}`)}
          className="btn btn-primary mt-8"
        >
          Back
        </button>
        <p className="text-green-500">{successMsg}</p>
        <p className="text-red-500">{failureMsg}</p>
      </div>
    </div>
  );
}

export default ResetPassword;
