import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { SiGooglefit } from 'react-icons/si';
import { useGlobalAuthContext } from '../../../Context/AuthContext';

function HomeHeroHeader() {
  const { authUser } = useGlobalAuthContext();
  const redirect = useNavigate();
  return (
    <div className="mr-auto place-self-center mt-2 flex flex-col justify-center items-center md:col-span-7 text-center">
      <SiGooglefit className="sm:hidden" color={'red'} size={120} />
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
        <span className="text-yellow-400 tracking-wider">Hope </span>
        <span className="text-blue-400 tracking-wider">Center </span>
        <span className="text-red-400 tracking-wider">Singapore</span>
      </h1>
      <p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        To serve all in need and share compassion in hope of a better future! Be
        a volunteer, and join our big family!
      </p>
      {!authUser && (
        <Button
          onClick={() => redirect('/signup')}
          variant="contained"
          size="large"
        >
          Join us!
        </Button>
      )}
    </div>
  );
}

export default HomeHeroHeader;
