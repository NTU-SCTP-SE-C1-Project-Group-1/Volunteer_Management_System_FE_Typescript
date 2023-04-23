import SignupForm from './SignupForm';
import { useGlobalAuthContext } from '../../../Context/AuthContext';

function SignupFormContainer() {
  const { tempForm, setTempForm } = useGlobalAuthContext();

  const changeHandler = (e: any): void => {
    setTempForm({ ...tempForm, [e.target.name]: e.target.value });
  };
  return (
    <>
      <SignupForm
        name={tempForm.name}
        email={tempForm.email}
        contact={tempForm.contact}
        address={tempForm.address}
        referrerName={tempForm.referrerName}
        referrerContact={tempForm.referrerContact}
        occupation={tempForm.occupation}
        profilePicture={tempForm.profilePicture}
        changeHandler={changeHandler}
      />
    </>
  );
}

export default SignupFormContainer;
