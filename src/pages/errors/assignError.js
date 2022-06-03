import React from 'react';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Axios from "axios";

function AssignError() {
    let navigate = useNavigate();

    const initialValues = {
        errorName: "",
        errorDescription: "",
        errorSteps: "",
        priority: "",
        username: "",
        developerAssigned: ""
    };

    const validationSchema = Yup.object().shape({
        errorName: Yup.string().min(2).max(100).required(),
        errorDescription: Yup.string().min(2).max(200).required(),
        errorSteps: Yup.string().min(2).max(200).required(),
        priority: Yup.string().min(2).max(200).required(),
        username: Yup.string().min(2).max(200).required(),
        developerAssigned: Yup.string().min(2).max(200).required()
    });

    //reporting the error
    const onSubmit = (data)=>{
        Axios.post("http://localhost:3002/assigned/", data).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }else{
                alert(response.data);
                navigate("/dashboard")
            }
        })
    }
  return (
    <div className='assignErrorContainer'>
        <div className='assignForm'>
            <h1>Report Error</h1>
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
                    <label>Priority:</label>
                    <ErrorMessage name='priority' component="span" className='error'/>
                    <Field name='priority' className="inputReport" type="text" placeholder="Priority"/>
                    <label>Creator:</label>
                    <ErrorMessage name='username' component="span" className='error'/>
                    <Field name='username' className="inputReport" type="email" placeholder="Creator"/>
                    <label>Assign Developer:</label>
                    <ErrorMessage name='developerAssigned' component="span" className='error'/>
                    <Field name='developerAssigned' className="inputReport" type="email" placeholder="developer"/>
                    <button type="submit">Assign Error</button>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default AssignError