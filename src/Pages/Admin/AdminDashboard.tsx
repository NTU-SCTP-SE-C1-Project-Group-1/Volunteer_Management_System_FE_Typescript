import StatsBoard from '../../Components/Admin/Dashboard/StatsBoard';
import Banners from '../../Components/Admin/Dashboard/Banners';

function AdminDashboard() {
  return (
    <div className="flex flex-col h-auto md:h-screen justify-start items-center mt-32 px-2">
      <div className="flex justify-between w-[80vw] ">
        <button className="btn text-white btn-sm">Override</button>
        <h2 className="hidden sm:block">Welcome, back!</h2>
        <h1 className="font-bold text-lg  text-blue-700">VMS Control Panel</h1>
      </div>
      <StatsBoard />
      <Banners />
    </div>
  );
}

export default AdminDashboard;
