import React, { useState } from 'react';
import { Formik, ErrorMessage, Form, Field} from "formik"
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css"

function AdminLogin() {
  // const [ username, setUsername ] = useState("");
  // const [ password, setPassword ] = useState("");
  // const data = { username: username, password: password };

  // const login = ()=>{
  //   Axios.post("http://localhost:3002/admauth/login", data ).then((response)=>{
  //   alert(response.data);
  //   })
  // }

  let navigate = useNavigate();
  //initial values of the inputs
  const initialValues = {
    username: "",
    password: ""
  }
// formik validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(2).max(20).required(),
    password: Yup.string().min(2).max(20).required(),
  })
//login function
  const loginAdmin = (data)=>{
    Axios.post("http://localhost:3002/admauth/login", data ).then((response)=>{
      if(response.data.error){
        alert(response.data.error)
      }else{
        localStorage.setItem("accessToken", response.data.accessToken)
        alert(response.data.message);
        navigate("/")
      }
      })
  }

  return (
    <div className='LoginContainer'>
      <div>
      <h1>Admin Login</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={loginAdmin}>
          <Form className='loginform'>
            <label>Username:</label>
            <ErrorMessage name="username" component="span" className="error" />
            <Field name="username" type="email" id="inputLogin" placeholder="Enter your email" />
            <label>Password:</label>
            <ErrorMessage name="password" component="span" className="error" />
            <Field name="password" type="password" id="inputLogin" placeholder="Enter your password" />
            <button type="submit">Login</button>
          </Form>
      </Formik>
      </div>
  </div>
    // <div className="adminLogin">
    //   <h1>Admin Login</h1>
    //   <div className="adminLoginContainer">
    //     <div className='formContainer'>
    //       <label>Username:</label>
    //       <input type="email" name="username" className='username' placeholder='Enter your email'required
    //         onChange={(event)=>{setUsername(event.target.value)}}/>
    //       <label>Password:</label>
    //       <input type="password" name="password" className='password' placeholder='Enter your password' required
    //         onChange={(event)=>{setPassword(event.target.value)}}/>
    //       <button onClick={login}>Login</button>
    //     </div>
    //   </div>
    // </div>
  )
}

export default AdminLogin