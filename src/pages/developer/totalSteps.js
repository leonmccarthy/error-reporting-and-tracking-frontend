import React, { useState, useEffect } from 'react';
import Axios from "axios";
import * as Yup from "yup"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom"
import "../../styles/totalSteps.css";

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
        Axios.put("http://localhost:3002/assigned/steps", {headers:{
            accessToken: localStorage.getItem("accessToken")
        }}, data).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }else{
                alert(response.data);
                navigate("/assigned")
            }
        })
    }
  return (
    <div className='totalStepsContainer'>
        <div className='form'>
            <h1>Update total steps to be completed</h1>
            {errorById.map((value, key)=>{
                return(
                    <Formik initialValues={
                        {   errorName: value.errorName,
                            errorDescription: value.errorDescription,
                            errorSteps: value.errorSteps,
                            priority: value.priority,
                            username: value.createdBy,
                            developerAssigned: value.developerassigned,
                            stepsToComplete: 0
                        }
                        } validationSchema={validationSchema} onSubmit={onSubmit}>
                            <Form>
                                <label>Error Name:</label>
                                <ErrorMessage name='errorName' component="span" className='error'/>
                                <Field name='errorName' className="inputReport" type="text" key={key} placeholder="Enter an error title" value={value.errorName}/>
                                <label>Error Description:</label>
                                <ErrorMessage name='errorDescription' component="span" className='error'/>
                                <Field name='errorDescription' className="inputReport" type="text" key={key} placeholder="Describe the error"  value={value.errorDescription}/>
                                <label>Error Steps:</label>
                                <ErrorMessage name='errorSteps' component="span" className='error'/>
                                <Field name='errorSteps' className="inputReport" type="text" key={key} placeholder="Write the steps you took to reach to the error"  value={value.errorSteps}/>
                                <label>Priority:</label>
                                <ErrorMessage name='priority' component="span" className='error'/>
                                <Field name='priority' className="inputReport" type="text" key={key} value={value.priority}/>
                                <label>Creator:</label>
                                <ErrorMessage name='username' component="span" className='error'/>
                                <Field name='username' className="inputReport" type="email" key={key} placeholder="Creator"  value={value.createdBy}/>
                                <label>Assigned Developer:</label>
                                <ErrorMessage name='developerAssigned' component="span" className='error'/>
                                <Field name='developerAssigned' className="inputReport" type="text" key={key} value={value.developerassigned}/>  
                                <label>Steps required for completion: </label>
                                <ErrorMessage name='stepsToComplete' component="span" className='error'/>
                                <Field name='stepsToComplete' type="text" className="inputAssign" placeholder="Enter number of steps"/>
                                <button type="submit">Submit number of steps</button>
                            </Form>
                    </Formik>
            )
        })}
        </div>
    </div>
  )
}

export default TotalSteps