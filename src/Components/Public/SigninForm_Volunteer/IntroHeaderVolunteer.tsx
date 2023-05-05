import { Link } from 'react-router-dom';

function IntroHeader() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-600 tracking-wider">
        Volunteer Sign in
      </h1>
      <p className="text-blue-800 text-lg">
        Don't have an account yet?{' '}
        <Link to="/signup" className="underline">
          Sign up.
        </Link>
      </p>
      <p className="text-gray-500 tracking-wider font-semibold">
        For Hope Volunteers
      </p>
    </div>
  );
}

export default IntroHeader;
