import { SiGooglefit } from 'react-icons/si';

function FormLogo() {
  return (
    <div className="flex justify-center items-center pt-8 space-x-2">
      <SiGooglefit size={32} color={'red'} />
      <h1 className="font-bold text-2xl text-blue-800">HopeForLife</h1>
    </div>
  );
}

export default FormLogo;
