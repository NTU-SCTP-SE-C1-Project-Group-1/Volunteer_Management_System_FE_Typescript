import { Navigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../Context/AuthContext';
import { ChildrenElementProp } from '../CustomHooks/TypesAndStates';

function ProtectedRoutesUser({ children }: ChildrenElementProp) {
  const { authUser } = useGlobalAuthContext();

  if (!authUser) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoutesUser;
