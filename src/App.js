import './styles/App.css';
import React, { useEffect, useState } from 'react';
import Axios from "axios"
import AdminLogin from "./pages/login/adminLogin";
import AdminChangePassword from './pages/changepassword/adminChangePassword';
import UserChangePassword from  './pages/changepassword/userChangePassword';
import DeveloperChangePassword from  './pages/changepassword/developerChangePassword'
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
import Sidebar from './pages/components/sideBar';
import { BrowserRouter as Router, Link, Route, Routes, useNavigate} from 'react-router-dom';
import { AuthContext } from "./helpers/AuthContext"
import NavBar from './pages/components/NavBar';

function App() {
  const [ authState, setAuthState ] = useState({username: "", id:0, role: "", status: true})

  useEffect(()=>{
    //API call for validation
    Axios.get("http://localhost:3002/auth/auth", {headers: {
      accessToken: localStorage.getItem("accessToken")
    }}).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status: false});
      }else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          role: response.data.role,
          status: true
        })
      }
    },[]);
    //API call for validation
    Axios.get("http://localhost:3002/devauth/auth", {headers: {
      accessToken: localStorage.getItem("accessToken")
    }}).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status: false});
      }else{
      setAuthState({
        username: response.data.username,
        id: response.data.id,
        role: response.data.role,
        status: true
      })
      }
    },[]);
    //API call for validation
    Axios.get("http://localhost:3002/admauth/auth", {headers: {
      accessToken: localStorage.getItem("accessToken")
    }}).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status: false});
      }else{
        // alert(localStorage.getItem("accessToken"))
      setAuthState({
        username: response.data.username,
        id: response.data.id,
        role: response.data.role,
        status: true
      })
      }
    },[]);
  })
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
            {authState.status === false &&<NavBar />}
            {authState.status === true &&<Sidebar />}
            
            {/* <Link to={"/a_login"}>Admin Login</Link>
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
            <Link to={"/completedsteps"}>Completed steps</Link> */}
            
            <Routes>
              <Route path='/a_login' element={<AdminLogin />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/a_changepassword' element={<AdminChangePassword />} />
              <Route path='/u_changepassword' element={<UserChangePassword />} />
              <Route path='/d_changepassword' element={<DeveloperChangePassword />} />
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;
