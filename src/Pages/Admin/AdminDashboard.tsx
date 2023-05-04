import StatsBoard from '../../Components/Admin/Dashboard/StatsBoard';
import Banners from '../../Components/Admin/Dashboard/Banners';
import { useQuery } from '@tanstack/react-query';
import { getAllProfiles, getAllEnrolments } from '../../CustomHooks/ApiActions';
import { useGlobalAuthContext } from '../../Context/AuthContext';
import Spinner from '../../Assets/spinner.gif';
import storage from '../../CustomHooks/LocalStorage';

function AdminDashboard() {
  const { authUser } = useGlobalAuthContext();
  const { data: profiles, isLoading: profilesIsLoading } = useQuery({
    queryKey: ['profiles', authUser?.accessToken, authUser?.uid],
    queryFn: () => getAllProfiles(authUser?.accessToken, authUser?.uid),
    onError: (err: any) => {
      const isLoggedIn = storage.get('isLoggedIn') as boolean;
      if (err.response.status === 401) {
        if (isLoggedIn && authUser) {
          window.location.reload();
        } else {
          return;
        }
      }
    },
  });

  const { data: enrolments } = useQuery({
    queryKey: ['enrolments', authUser?.accessToken],
    queryFn: () => getAllEnrolments(authUser?.accessToken),
    onError: (err: any) => {
      const isLoggedIn = storage.get('isLoggedIn') as boolean;
      if (err.response.status === 401) {
        if (isLoggedIn && authUser) {
          window.location.reload();
        } else {
          return;
        }
      }
    },
  });

  if (profilesIsLoading)
    return (
      <div className="h-[75vh] flex justify-center items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="Loading" />
      </div>
    );

  return (
    <div className="flex flex-col h-auto justify-start items-center mt-32 px-2">
      <div className="flex justify-between w-[80vw] ">
        <button className="btn text-white btn-sm">Override</button>
        <h2 className="hidden sm:block">Welcome, back!</h2>
        <h1 className="font-bold text-lg  text-blue-700">VMS Control Panel</h1>
      </div>
      <StatsBoard profiles={profiles?.data} enrolments={enrolments?.data} />
      <Banners />
    </div>
  );
}

export default AdminDashboard;
