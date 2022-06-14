import React, { useContext } from 'react';
import Axios from 'axios';
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik";
import {AuthContext} from "../../helpers/AuthContext";
import "../../styles/changePassword.css"
import {Button} from "react-bootstrap"
import "../../bootstrap/css/bootstrap.min.css"


function DeveloperChangePassword() {
  const {authState} = useContext(AuthContext)

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
    Axios.put("http://localhost:3002/devauth/changepassword", data , { headers:{
            accessToken: localStorage.getItem("accessToken")
            }}).then((response)=>{
                alert(JSON.stringify(response.data));
    })
  }

  return (
    <div className="developerChangePassword">
      <h1>Developer Change Password</h1>
      <div className="developerChangePasswordContainer">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={changePassword}>
            <Form>
              <label>Username:</label>
              <ErrorMessage name="username" className='error' component="span"/>
              <Field type="email" name="username" className='username' value={authState.username}/>
              <label>Old Password: </label>
              <ErrorMessage name="oldPassword" className='error' component="span"/>
              <Field type="password" name="oldPassword" className='oldPassword'/>
              <label>New Password: </label>
              <ErrorMessage name="newPassword" className='error' component="span"/>
              <Field type="password" name="newPassword" className='newPassword'/>
              <Button type="submit" variant="primary">Change password</Button>
            </Form>
        </Formik>
      </div>
    </div>
  )
}

export default DeveloperChangePassword;