import { Button } from '@mui/material';

function HomeHeroHeader() {
  return (
    <div className="mr-auto place-self-center lg:col-span-7 text-center">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
        <span className="text-yellow-400 tracking-wider">Hope </span>
        <span className="text-blue-400 tracking-wider">Center </span>
        <span className="text-red-400 tracking-wider">Singapore</span>
      </h1>
      <p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        To serve all in need and share compassion in hope of a better future! Be
        a volunteer, and join our big family!
      </p>

      <Button variant="contained" size="large">
        Join us!
      </Button>
    </div>
  );
}

export default HomeHeroHeader;
