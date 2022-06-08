import './styles/App.css';
import AdminLogin from "./pages/login/adminLogin";
import AdminChangePassword from './pages/changepassword/adminChangePassword';
import AdminRegister from './pages/registration/adminRegister';
import DevRegister from './pages/registration/devRegister';
import DevLogin from './pages/login/devLogin';
import UserRegister from './pages/registration/userRegister';
import UserLogin from './pages/login/userLogin';
import Dashboard from './pages/components/Dashboard';
import ReportError from './pages/errors/reportError';
import AssignError from './pages/errors/assignError';
import AssignedErrors from './pages/components/assignedErrors';
import TotalSteps from './pages/developer/totalSteps';
import CompletedSteps from './pages/developer/completedSteps';
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
          <Router>
            <Link to={"/a_login"}>Admin Login</Link>
            <Link to={"/a_reg"}>Admin Register</Link>
            <Link to={"/a_changepassword"}>Admin Change Password</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
            <Link to={"/d_reg"}>Dev Register</Link>
            <Link to={"/d_login"}>Dev Login</Link>
            <Link to={"/u_reg"}>User Register</Link>
            <Link to={"/u_login"}>User Login</Link>
            <Link to={"/report"}>Report Error</Link>
            <Link to={"/assign"}>Assign Error</Link>
            <Link to={"/assigned"}>Assigned Errors</Link>
            <Link to={"/totalsteps"}>Completion steps</Link>
            <Link to={"/completedsteps"}>Completed steps</Link>
            <Routes>
              <Route path='/a_login' element={<AdminLogin />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/a_changepassword' element={<AdminChangePassword />} />
              <Route path='/a_reg' element={<AdminRegister />} />
              <Route path='/d_reg' element={<DevRegister />} />
              <Route path='/d_login' element={<DevLogin />} />
              <Route path='/u_reg' element={<UserRegister />} />
              <Route path='/u_login' element={<UserLogin />} />
              <Route path='/report' element={<ReportError />} />
              <Route path='/assign/:id' element={<AssignError />} />
              <Route path='/assigned' element={<AssignedErrors />} />
              <Route path='/totalsteps/:id' element={<TotalSteps />} />
              <Route path='/completedsteps/:id' element={<CompletedSteps />} />
            </Routes>
          </Router>
    </div>
  );
}

export default App;
