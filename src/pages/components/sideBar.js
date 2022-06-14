import React, { useContext, useEffect, useState } from 'react';
import "../../styles/sidebar.css";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from 'react-router-dom';


function SideBar() {
  let navigate = useNavigate();
  const {authState, setAuthState} = useContext(AuthContext)
  const logout = ()=>{
    localStorage.removeItem("accessToken");
    setAuthState({
        username: "",
        id: 0,
        role: "",
        status: false
    })
    navigate("/")
  }

  return (
    <div className='sidebar'>
      <h1 className='brand'>Error Report</h1>
        <ul>
          <li className='nav-link' onClick={()=>{navigate("/dashboard")}}>Dashboard</li>
          {authState.role === "user" && <li className='nav-link' onClick={()=>{navigate("/report")}}>Report Bug</li>}
          <li className='nav-link' onClick={()=>{navigate("/assigned")}}>View Bug</li>
          <li className='nav-link' onClick={()=>{ switch(authState.role){
            case "admin":
              navigate("/a_changepassword");
              break;
            case "user":
              navigate("/u_changepassword");
              break;
            case "developer":
              navigate("/d_changepassword");
              break;
          }
            
            }}>My profile</li>
          {authState.role === "admin" && <li className='nav-link' onClick={()=>{navigate("/d_reg")}}>Register Developer</li>}
        </ul>
        <button className='btn-logout' onClick={logout}>Logout</button>
  </div>
  )
}

export default  SideBar