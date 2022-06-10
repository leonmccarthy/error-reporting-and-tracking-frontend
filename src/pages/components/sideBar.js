import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../helpers/AuthContext"
import "../../styles/sidebar.css"
import AdminChangePassword from '../changepassword/adminChangePassword';
import ReportError from '../errors/reportError';
import AssignedErrors from './assignedErrors';
import Dashboard from './Dashboard';

function SideBar() {
  let navigate = useNavigate();
  return (
    <div className='sidebar'>
        <h1 className='brand'>Error Report</h1>
        <ul>
          <li className='nav-link' onClick={()=>{navigate("/dashboard")}}>Dashboard</li>
          <li className='nav-link' onClick={()=>{navigate("/report")}}>Report Bug</li>
          <li className='nav-link' onClick={()=>{navigate("/assigned")}}>View Bug</li>
          <li className='nav-link' onClick={()=>{navigate("/a_changepassword")}}>My profile</li>
        </ul>
        <button className='btn-logout'>Logout</button>
  </div>
  )
}

export default SideBar