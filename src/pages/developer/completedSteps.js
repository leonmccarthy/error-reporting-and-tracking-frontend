import React, { useEffect, useState } from 'react';
import Axios from "axios";
import * as Yup from "yup"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom"
import "../../styles/completedSteps.css"
import {Button} from "react-bootstrap"
import "../../bootstrap/css/bootstrap.min.css"

function CompletedSteps() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [ errorById, setErrorById ] = useState([]);

    useEffect(()=>{
        Axios.get(`http://localhost:3002/assigned/display/byId/${id}`).then((response)=>{
            setErrorById(response.data)
        })
    }, [])
    // const initialValues = {
    //     errorDescription: "",
    //     stepsDone: 0
    // };

    const validationSchema = Yup.object().shape({
        errorName: Yup.string().min(2).max(100).required(),
        errorDescription: Yup.string().min(2).max(200).required(),
        errorSteps: Yup.string().min(2).max(200).required(),
        priority: Yup.string().required("Please select a priority level"),
        username: Yup.string().min(2).max(200).required(),
        developerAssigned: Yup.string().required("Please select a developer"),
        stepsDone: Yup.number().required()
    });

    const onSubmit = (data) =>{
        Axios.put("http://localhost:3002/assigned/stepsdone", data , { headers:{
            accessToken: localStorage.getItem("accessToken")
            }}).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }else{
                alert(response.data.message);
                navigate("/assigned")
            }
        })
    }
  return (
    <div className='completedSteps'>
        <div className='completedStepsContainer'>
            <div className="header">
                <h1>Update steps completed</h1>
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
                            stepsDone: value.stepsDone
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
                            <Field name='username' className="inputReport" type="email" key={key}  value={value.createdBy} disabled/>
                            <label>Assigned Developer:</label>
                            <ErrorMessage name='developerAssigned' component="span" className='error'/>
                            <Field name='developerAssigned' className="inputReport" type="text" key={key} value={value.developerassigned} disabled/>  
                            <label>Steps done to attain completion: </label>
                            <ErrorMessage name='stepsDone' component="span" className='error'/>
                            <Field name='stepsDone' type="text" className="inputAssign" placeholder="Enter number of steps"/>
                            <Button type="submit" variant="primary">Submit number of steps completed</Button>
                        </Form>
                    </Formik>
                )
            })}
        </div>
    </div>
  )
}

export default CompletedSteps