import React from 'react';
import { Formik, ErrorMessage, Form, Field} from "formik"
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css"
import {Button} from "react-bootstrap"
import "../../bootstrap/css/bootstrap.min.css"

function AdminRegister() {
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
  const registerAdmin = (data)=>{
      Axios.post("http://localhost:3002/admauth/",data).then((response)=>{
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
      <div className='registerform'>
            <div className="header">
                <h1>Admin Registration</h1>
            </div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={registerAdmin}>
                <Form>
                  <label>First name:</label>
                  <ErrorMessage name="firstname" component="span" className="error" />
                  <Field name="firstname" type="text" className="textfield" placeholder="Enter your first name" />
                  <label>Last name:</label>
                  <ErrorMessage name="lastname" component="span" className="error" />
                  <Field name="lastname" type="text" className="textfield" placeholder="Enter your last name" />
                  <label>Username:</label>
                  <ErrorMessage name="username" component="span" className="error" />
                  <Field name="username" type="email" className="textfield" placeholder="Enter your email" />
                  <label>Password:</label>
                  <ErrorMessage name="password" component="span" className="error" />
                  <Field name="password" type="password" className="textfield" placeholder="Enter your password" />
                  <Button type="submit" variant="primary">Register</Button>
                </Form>
            </Formik>
      </div>
      
    </div>
  )
}

export default AdminRegister