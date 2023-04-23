import { Outlet } from 'react-router-dom';

function SignupForVolunteer() {
  return (
    <>
      <h2 className="mt-28 sm:mt-36 md:mt-32 text-center tracking-wider text-gray-600">
        New Volunteer Registration
      </h2>
      <div className="flex flex-col w-screen h-auto justify-center items-center">
        <Outlet />
      </div>
    </>
  );
}

export default SignupForVolunteer;
