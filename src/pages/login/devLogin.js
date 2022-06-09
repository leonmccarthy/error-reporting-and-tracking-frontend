import React from 'react';
import { Formik, ErrorMessage, Form, Field} from "formik"
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function DevLogin() {
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
  const loginDev = (data)=>{
    Axios.post("http://localhost:3002/devauth/login", data ).then((response)=>{
      if(response.data.error){
        alert(response.data.error)
      }else{
        localStorage.setItem("accessToken", response.data.accessToken)
        alert(response.data.message)
        navigate("/")
      }
      })
  }

  return (
    <div className='LoginContainer'>
    <h1>Developer Login</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={loginDev}>
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
  )
}

export default DevLogin