import { Navigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../Context/AuthContext';
import { ChildrenElementProp } from '../CustomHooks/TypesAndStates';

function ProtectedRoutesUser({ children }: ChildrenElementProp) {
  const { authUser } = useGlobalAuthContext();

  if (!authUser) {
    setTimeout(() => {
      return <Navigate to="/signin" />;
    }, 1500);
  }

  return children;
}

export default ProtectedRoutesUser;
