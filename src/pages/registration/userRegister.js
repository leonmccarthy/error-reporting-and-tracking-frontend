import React from 'react';
import { Formik, ErrorMessage, Form, Field} from "formik"
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  let navigate = useNavigate();
  //initial values of the inputs
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    password: ""
  }
// formik validation schema
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(2).max(20).required(),
    lastname: Yup.string().min(2).max(20).required(),
    username: Yup.string().min(2).max(20).required(),
    password: Yup.string().min(2).max(20).required(),
  })
//registration function
  const userRegister = (data)=>{
      Axios.post("http://localhost:3002/auth/",data).then((response)=>{
        if(response.data.error){
          alert(response.data.error)
        }else{
          alert(response.data)
          navigate("/")
        }
      })
  }
  return (
    <div className='RegisterContainer'>
    <h1>User Registration</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={userRegister}>
          <Form className='registerform'>
            <label>First name:</label>
            <ErrorMessage name="firstname" component="span" className="error" />
            <Field name="firstname" type="text" id="inputRegister" placeholder="Enter your first name" />
            <label>Last name:</label>
            <ErrorMessage name="lastname" component="span" className="error" />
            <Field name="lastname" type="text" id="inputRegister" placeholder="Enter your last name" />
            <label>Username:</label>
            <ErrorMessage name="username" component="span" className="error" />
            <Field name="username" type="email" id="inputRegister" placeholder="Enter your email" />
            <label>Password:</label>
            <ErrorMessage name="password" component="span" className="error" />
            <Field name="password" type="password" id="inputRegister" placeholder="Enter your password" />
            <button type="submit">Register</button>
          </Form>
      </Formik>
  </div>
  )
}

export default UserRegister;