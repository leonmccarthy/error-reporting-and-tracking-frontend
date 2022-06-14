import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../helpers/AuthContext"
import "../../styles/navbar.css"

function NavBar() {
    let navigate = useNavigate()
    const {authState} = useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className="container">
      <ul>
           {authState.status === false &&<li className='nav-link' onClick={()=>{navigate("/u_login")}}>User Login</li>}
           {authState.status === false &&<li className='nav-link' onClick={()=>{navigate("/a_login")}}>Admin Login</li>}
           {authState.status === false && <li className='nav-link' onClick={()=>{navigate("/d_login")}}>Developer Login</li>}
           {authState.status === true && <li className='nav-link' onClick={()=>{navigate("/d_login")}}>Welcome, {authState.username}</li>}
        </ul>
      </div>
      
     
    </div>
  )
}

export default NavBar