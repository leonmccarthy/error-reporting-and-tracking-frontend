import React, { useContext } from 'react';
import Axios from 'axios';
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik";
import {AuthContext} from "../../helpers/AuthContext";
import "../../styles/changePassword.css"
import {Button} from "react-bootstrap"
import "../../bootstrap/css/bootstrap.min.css"
import { useNavigate } from 'react-router-dom';


function AdminChangePassword() {
  const {authState} = useContext(AuthContext)
  let navigate = useNavigate();

  const initialValues = {
    username: authState.username,
    oldPassword: "",
    newPassword: ""
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string(),
    oldPassword: Yup.string().required(),
    newPassword: Yup.string().required()
  })

  const changePassword = (data)=>{
    Axios.put("http://localhost:3002/admauth/changepassword", data , { headers:{
            accessToken: localStorage.getItem("accessToken")
            }}).then((response)=>{
              alert(response.data);
              navigate("/dashboard")
    })
  }

  return (
    <div className="ChangePassword">
      <div className="ChangePasswordContainer">
        <div className="header">
          <h1>Change Password</h1>
        </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={changePassword}>
              <Form>
                <label>Username:</label>
                <ErrorMessage name="username" className='error' component="span"/>
                <Field type="email" name="username" className='textfield' value={authState.username} disabled/>
                <label>Old Password: </label>
                <ErrorMessage name="oldPassword" className='error' component="span"/>
                <Field type="password" name="oldPassword" className='textfield'/>
                <label>New Password: </label>
                <ErrorMessage name="newPassword" className='error' component="span"/>
                <Field type="password" name="newPassword" className='textfield'/>
                <Button type="submit" variant="primary">Change password</Button>
              </Form>
          </Formik>
      </div>
    </div>
  )
}

export default AdminChangePassword;