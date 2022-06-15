import React, { useContext } from 'react';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Axios from "axios";
import "../../styles/reportError.css"
import {Button} from "react-bootstrap"
import "../../bootstrap/css/bootstrap.min.css"
import { AuthContext } from "../../helpers/AuthContext"

function ReportError() {
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    const initialValues = {
        errorName: "",
        errorDescription: "",
        errorSteps: "",
        username: authState.username
    };

    const validationSchema = Yup.object().shape({
        errorName: Yup.string().min(2).max(100).required(),
        errorDescription: Yup.string().min(2).max(200).required(),
        errorSteps: Yup.string().min(2).max(200).required(),
        username: Yup.string().min(2).max(200).required()
    });

    //reporting the error
    const onSubmit = (data)=>{
        Axios.post("http://localhost:3002/error/", data , { headers:{
            accessToken: localStorage.getItem("accessToken")
            }}).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }else{
                alert(response.data);
                navigate("/dashboard")
            }
        })
    }

  return (
    <div className='reportErrorContainer'>
        <div className='reportForm'>
            <div className="header">
                <h1>Report Error</h1>
            </div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <label>Error Name:</label>
                    <ErrorMessage name='errorName' component="span" className='error'/>
                    <Field name='errorName' className="inputReport" type="text" placeholder="Enter an error title"/>
                    <label>Error Description:</label>
                    <ErrorMessage name='errorDescription' component="span" className='error'/>
                    <Field name='errorDescription' className="inputReport" type="text" placeholder="Describe the error"/>
                    <label>Error Steps:</label>
                    <ErrorMessage name='errorSteps' component="span" className='error'/>
                    <Field name='errorSteps' className="inputReport" type="text" placeholder="Write the steps you took to reach to the error"/>
                    <label>Creator</label>
                    <ErrorMessage name='username' component="span" className='error'/>
                    <Field name='username' className="inputReport" type="email" value={authState.username} disabled/>
                    <Button type="submit" variant="primary">Submit Error</Button>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default ReportError