import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import storage from './CustomHooks/LocalStorage';
import { useGlobalAuthContext } from './Context/AuthContext';

// Layout Components
import Layout from './Layouts/Layout';

// Protected Routes
import ProtectedRoutesUser from './AuthRoutes/ProtectedRouteUser';
import ProtectedRouteAdmin from './AuthRoutes/ProtectedRouteAdmin';

// Public Componments - accessable without login
import Home from './Pages/Public/Home';
import SigninForVolunteer from './Pages/Public/SigninForVolunteer';
import SigninForAdmin from './Pages/Public/SigninForAdmin';
import SignupForVolunteer from './Pages/Public/SignupForVolunteer';
import SignupFormContainer from './Components/Public/SignupForm_Volunteer/SignupFormContainer';
import EnterPasswordForm from './Components/Public/SignupForm_Volunteer/EnterPasswordForm';

// Volunteer Components - Volunteer signed in
import Profile from './Pages/Volunteer/Profile';
import ResetPassword from './Pages/Volunteer/ResetPassword';
import EditProfile from './Pages/Volunteer/EditProfile';

// Admin Components - Administrator signed in
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AllVolunteers from './Pages/Admin/AllVolunteers';
import VolunteerProfilePage from './Pages/Admin/VolunteerProfilePage';
import VolunteerEditProfile from './Pages/Admin/VolunteerEditProfile';
import ProgramSelectionInProfilePage from './Pages/Admin/ProgramSelectionInProfilePage';
import ProgramsPage from './Pages/Admin/ProgramsPage';
import ProgramInfoPage from './Pages/Admin/ProgramInfoPage';
import CreateProgram from './Pages/Admin/CreateProgram';
import ProgramEditPage from './Pages/Admin/ProgramEditPage';
import PendingProfilePage from './Pages/Admin/PendingProfilePage';

function App() {
  const { authUser } = useGlobalAuthContext();
  const isLoggedInStatus = storage.get('isLoggedIn') as boolean;
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SigninForVolunteer />} />
            <Route path="/signup" element={<SignupForVolunteer />}>
              <Route index element={<SignupFormContainer />} />
              <Route path="password" element={<EnterPasswordForm />} />
            </Route>
            <Route path="/admin/signin" element={<SigninForAdmin />} />
            {/* Volunteer Signed-in */}
            <Route
              path="/volunteer/profile/:id"
              element={
                !authUser && !isLoggedInStatus ? (
                  <Navigate to="/signin" />
                ) : (
                  <Profile />
                )
              }
            />
            <Route
              path="/volunteer/profile/:id/edit"
              element={
                <ProtectedRoutesUser>
                  <EditProfile />
                </ProtectedRoutesUser>
              }
            />
            <Route
              path="/volunteer/profile/:id/resetpassword"
              element={
                <ProtectedRoutesUser>
                  <ResetPassword />
                </ProtectedRoutesUser>
              }
            />
            {/* Admin Signed-in */}
            <Route
              path="/admin/dashboard"
              element={
                !authUser && !isLoggedInStatus ? (
                  <Navigate to="/admin/signin" />
                ) : (
                  <AdminDashboard />
                )
              }
            />

            <Route
              path="/admin/volunteers/pending"
              element={
                <ProtectedRouteAdmin>
                  <PendingProfilePage />
                </ProtectedRouteAdmin>
              }
            />

            <Route
              path="/admin/volunteers"
              element={
                <ProtectedRouteAdmin>
                  <AllVolunteers />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/admin/volunteers/:id"
              element={
                <ProtectedRouteAdmin>
                  <VolunteerProfilePage />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/admin/volunteers/edit/:id"
              element={
                <ProtectedRouteAdmin>
                  <VolunteerEditProfile />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/admin/volunteers/programs/:id/:date/:timeslot/:name"
              element={
                <ProtectedRouteAdmin>
                  <ProgramSelectionInProfilePage />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/admin/programs"
              element={
                <ProtectedRouteAdmin>
                  <ProgramsPage />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/admin/programs/:id"
              element={
                <ProtectedRouteAdmin>
                  <ProgramInfoPage />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/admin/programs/new"
              element={
                <ProtectedRouteAdmin>
                  <CreateProgram />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/admin/programs/:id/edit"
              element={
                <ProtectedRouteAdmin>
                  <ProgramEditPage />
                </ProtectedRouteAdmin>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
