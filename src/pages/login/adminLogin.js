import React, { useState } from 'react';
import Axios from 'axios';

function AdminLogin() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const data = { username: username, password: password };

  const login = ()=>{
    Axios.get("https://senior-project-trial-app.herokuapp.com/admauth/login", data).then((response)=>{
    alert(response.data);
    })
  }

  return (
    <div className="adminLogin">
      <h1>Admin Login</h1>
      <div className="adminLoginContainer">
        <div className='formContainer'>
          <label>Username:</label>
          <input type="email" name="username" className='username' placeholder='Enter your email'required
            onChange={(event)=>{setUsername(event.target.value)}}/>
          <label>Password:</label>
          <input type="password" name="password" className='password' placeholder='Enter your password' required
            onChange={(event)=>{setPassword(event.target.value)}}/>
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin