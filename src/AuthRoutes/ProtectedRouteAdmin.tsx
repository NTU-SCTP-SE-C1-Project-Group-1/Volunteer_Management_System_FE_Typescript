import { Navigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../Context/AuthContext';
import storage from '../CustomHooks/LocalStorage';
import { ChildrenElementProp } from '../CustomHooks/TypesAndStates';

function ProtectedRouteAdmin({ children }: ChildrenElementProp) {
  const { authUser } = useGlobalAuthContext();
  const isAdmin = storage.get('isAdmin') as boolean;
  const isLoggedInStatus = storage.get('isLoggedIn') as boolean;

  if (!isLoggedInStatus && !authUser && !isAdmin) {
    return <Navigate to="/admin/signin" />;
  }

  return children;
}

export default ProtectedRouteAdmin;
