import React, { useState, useEffect } from 'react';
import Axios from "axios";
import * as Yup from "yup"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom"
import "../../styles/completedSteps.css";
import {Button} from "react-bootstrap"
import "../../bootstrap/css/bootstrap.min.css"

function TotalSteps() {
    let { id } = useParams();
    const [ errorById, setErrorById ] = useState([]);
    let navigate = useNavigate();

    useEffect(()=>{
        Axios.get(`http://localhost:3002/assigned/display/byId/${id}`).then((response)=>{
            setErrorById(response.data)
        })
    }, [])

    const validationSchema = Yup.object().shape({
        errorName: Yup.string().min(2).max(100).required(),
        errorDescription: Yup.string().min(2).max(200).required(),
        errorSteps: Yup.string().min(2).max(200).required(),
        priority: Yup.string().required("Please select a priority level"),
        username: Yup.string().min(2).max(200).required(),
        developerAssigned: Yup.string().required("Please select a developer"),
        stepsToComplete: Yup.number().required()
    });

    const onSubmit = (data) =>{
        Axios.put("http://localhost:3002/assigned/steps", data , { headers:{
            accessToken: localStorage.getItem("accessToken")
            }}).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }else{
                alert(response.data);
                navigate("/assigned")
            }
        })
    }
  return (
    <div className='totalSteps'>
        <div className='totalStepsContainer'>
            <div className="header">
                <h1>Update total steps to be completed</h1>
            </div>
            {errorById.map((value, key)=>{
                return(
                    <Formik initialValues={
                        {   errorName: value.errorName,
                            errorDescription: value.errorDescription,
                            errorSteps: value.errorSteps,
                            priority: value.priority,
                            username: value.createdBy,
                            developerAssigned: value.developerassigned,
                            stepsToComplete: value.stepsToComplete
                        }
                        } validationSchema={validationSchema} onSubmit={onSubmit}>
                            <Form>
                                <label>Error Name:</label>
                                <ErrorMessage name='errorName' component="span" className='error'/>
                                <Field name='errorName' className="inputReport" type="text" key={key} value={value.errorName} disabled/>
                                <label>Error Description:</label>
                                <ErrorMessage name='errorDescription' component="span" className='error'/>
                                <Field name='errorDescription' className="inputReport" type="text" key={key} value={value.errorDescription} disabled/>
                                <label>Error Steps:</label>
                                <ErrorMessage name='errorSteps' component="span" className='error'/>
                                <Field name='errorSteps' className="inputReport" type="text" key={key} value={value.errorSteps} disabled/>
                                <label>Priority:</label>
                                <ErrorMessage name='priority' component="span" className='error'/>
                                <Field name='priority' className="inputReport" type="text" key={key} value={value.priority} disabled/>
                                <label>Creator:</label>
                                <ErrorMessage name='username' component="span" className='error'/>
                                <Field name='username' className="inputReport" type="email" key={key} value={value.createdBy} disabled/>
                                <label>Assigned Developer:</label>
                                <ErrorMessage name='developerAssigned' component="span" className='error'/>
                                <Field name='developerAssigned' className="inputReport" type="text" key={key} value={value.developerassigned} disabled/>  
                                <label>Steps required for completion: </label>
                                <ErrorMessage name='stepsToComplete' component="span" className='error'/>
                                <Field name='stepsToComplete' type="text" className="inputReport" placeholder="Enter number of steps"/>
                                <Button type="submit" variant="primary">Submit number of steps</Button>
                            </Form>
                    </Formik>
            )
        })}
        </div>
    </div>
  )
}

export default TotalSteps