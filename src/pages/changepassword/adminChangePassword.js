import React, { useState } from 'react';
import Axios from 'axios';

function AdminChangePassword() {
  const [ username, setUsername ] = useState("");
  const [ oldPassword, setOldPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const data = { username: username, oldPassword: oldPassword, newPassword: newPassword};

  const changePassword = ()=>{
    Axios.put("http://localhost:3002/admauth/changepassword", data ).then((response)=>{
    alert(response.data);
    })
  }

  return (
    <div className="adminChangePassword">
      <h1>Admin Change Password</h1>
      <div className="adminChangePasswordContainer">
        <div className='formContainer'>
          <label>Username:</label>
          <input type="email" name="username" className='username' placeholder='Enter your email'required
            onChange={(event)=>{setUsername(event.target.value)}}/>
          <label>Old Password: </label>
          <input type="password" name="oldpassword" className='oldpassword' placeholder='Enter your old password' required
            onChange={(event)=>{setOldPassword(event.target.value)}}/>
          <label>New Password: </label>
          <input type="password" name="newpassword" className='newpassword' placeholder='Enter your new password' required
            onChange={(event)=>{setNewPassword(event.target.value)}}/>
          <button onClick={changePassword}>Change password</button>
        </div>
      </div>
    </div>
  )
}

export default AdminChangePassword;