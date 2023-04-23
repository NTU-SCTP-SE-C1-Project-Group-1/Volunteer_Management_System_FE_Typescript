import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Layout from './Layouts/Layout';

// Page Componments - Public
import Home from './Pages/Public/Home';
import SigninForVolunteer from './Pages/Public/SigninForVolunteer';
import SigninForAdmin from './Pages/Public/SigninForAdmin';
import SignupForVolunteer from './Pages/Public/SignupForVolunteer';
import SignupFormContainer from './Components/Public/SignupForm_Volunteer/SignupFormContainer';
import EnterPasswordForm from './Components/Public/SignupForm_Volunteer/EnterPasswordForm';

// Volunteer Components - Volunteer signed in
import Profile from './Pages/Volunteer/Profile';

function App() {
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
            <Route path="/admin" element={<SigninForAdmin />} />
            {/* Volunteer Signed-in */}
            <Route path="/volunteer/profile/:id" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
