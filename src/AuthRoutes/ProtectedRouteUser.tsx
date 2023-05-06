import { Navigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../Context/AuthContext';
import { ChildrenElementProp } from '../CustomHooks/TypesAndStates';
import storage from '../CustomHooks/LocalStorage';

function ProtectedRoutesUser({ children }: ChildrenElementProp) {
  const { authUser } = useGlobalAuthContext();
  const isLoggedInStatus = storage.get('isLoggedIn') as boolean;

  if (!authUser && !isLoggedInStatus) {
    setTimeout(() => {
      return <Navigate to="/signin" />;
    }, 1500);
  }

  return children;
}

export default ProtectedRoutesUser;
