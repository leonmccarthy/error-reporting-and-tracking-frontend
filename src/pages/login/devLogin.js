import React from 'react';
import { Formik, ErrorMessage, Form, Field} from "formik"
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css"
import {Button} from "react-bootstrap"
import "../../bootstrap/css/bootstrap.min.css"

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
      <div className='LoginForm'>
            <div className="header">
                <h1>Developer Login</h1>
            </div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={loginDev}>
                <Form className='loginform'>
                  <label>Username:</label>
                  <ErrorMessage name="username" component="span" className="error" />
                  <Field name="username" type="email" className="textfield" placeholder="Enter your email" />
                  <label>Password:</label>
                  <ErrorMessage name="password" component="span" className="error" />
                  <Field name="password" type="password" className="textfield" placeholder="Enter your password" />
                  <Button type="submit" variant="primary">Login</Button>
                </Form>
            </Formik>
      </div>
  </div>
  )
}

export default DevLogin