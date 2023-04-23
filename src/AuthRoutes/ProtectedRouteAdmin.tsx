import { Navigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../Context/AuthContext';
import storage from '../CustomHooks/LocalStorage';
import { ChildrenElementProp } from '../CustomHooks/TypesAndStates';

function ProtectedRouteAdmin({ children }: ChildrenElementProp) {
  const { authUser } = useGlobalAuthContext();
  const isAdmin = storage.get('isAdmin') as boolean;

  if (!authUser || !isAdmin) {
    return <Navigate to="/admin/signin" />;
  }

  return <div></div>;
}

export default ProtectedRouteAdmin;
