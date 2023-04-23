import { useContext, createContext, useState, useEffect } from 'react';
import { FormInitialState } from '../CustomHooks/TypesAndStates';
import { auth } from '../FirebaseConfiguration/Firebase';
import {
  createUserWithEmailAndPassword, // signup new user
  signInWithEmailAndPassword, // signin and receive jwt token from firebase
  onAuthStateChanged, // recceive user jwt and details after signin
  signOut,
  updatePassword,
} from 'firebase/auth';
import storage from '../CustomHooks/LocalStorage';

interface ContextType {
  createUserWithPwAndEmail: (
    email: string,
    password: string
  ) => Promise<unknown>;
  signInUserWithPwAndEmail: (
    email: string,
    password: string
  ) => Promise<unknown>;
  signout: () => void;
  passwordReset: (newPassword: string) => Promise<void>;
  tempForm: typeof FormInitialState;
  setTempForm: React.Dispatch<React.SetStateAction<typeof FormInitialState>>;
  authUser: any;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext({} as ContextType);

// Schema of children - props of context compoment
interface ContextChildrenType {
  children: React.ReactNode;
}

const loggedInStatus = storage.get('isLoggedIn') || false;
const adminStatus = storage.get('isAdmin') || false;

function AuthContextProvider({ children }: ContextChildrenType) {
  const [authUser, setAuthUser] = useState<any>();
  const [isAdmin, setIsAdmin] = useState<boolean>(adminStatus as boolean);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    loggedInStatus as boolean
  );
  const [tempForm, setTempForm] =
    useState<typeof FormInitialState>(FormInitialState);

  // Get access Info from firebase
  useEffect(() => {
    const listenToAuth = onAuthStateChanged(auth, (currentUser: any) => {
      setAuthUser(currentUser);
    });
    return () => {
      listenToAuth();
    };
  }, [isLoggedIn]);

  // FIREBASE APIs - ****TO BE REFACTORED
  // 1. Firebase = Create new user
  const createUserWithPwAndEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Firebase = Sign in Existing user
  const signInUserWithPwAndEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Logout
  const signout = () => {
    setIsLoggedIn(false);
    signOut(auth);
  };

  // 4. Reset Password
  const passwordReset = (newPassword: string) => {
    const user: any = auth.currentUser;
    return updatePassword(user, newPassword);
  };

  const ctx = {
    createUserWithPwAndEmail,
    signInUserWithPwAndEmail,
    signout,
    passwordReset,
    tempForm,
    setTempForm,
    authUser,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

export const useGlobalAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
