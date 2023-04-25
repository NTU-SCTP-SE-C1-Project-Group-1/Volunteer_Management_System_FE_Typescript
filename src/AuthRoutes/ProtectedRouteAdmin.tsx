import { Navigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../Context/AuthContext';
import storage from '../CustomHooks/LocalStorage';
import { ChildrenElementProp } from '../CustomHooks/TypesAndStates';

function ProtectedRouteAdmin({ children }: ChildrenElementProp) {
  const { authUser } = useGlobalAuthContext();
  const isAdmin = storage.get('isAdmin') as boolean;

  if (!authUser || !isAdmin) {
    setTimeout(() => {
      return <Navigate to="/admin/signin" />;
    }, 1500);
  }

  return children;
}

export default ProtectedRouteAdmin;
