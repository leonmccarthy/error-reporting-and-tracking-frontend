import React,{ useEffect, useState } from 'react';
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Axios from "axios";

function AssignError() {
    let {id} = useParams();
    let navigate = useNavigate();
    const [ allDeveloper, setAllDeveloper ] = useState([]);

    const [errorFields, setErrorFields] = useState([]);
    useEffect(()=>{
        Axios.get(`http://localhost:3002/error/byId/${id}`).then((response)=>{
            setErrorFields(response.data)
        });
        Axios.get(`http://localhost:3002/devauth//displayAll`).then((response)=>{
            setAllDeveloper(response.data)
        });
    }, [])



    const validationSchema = Yup.object().shape({
        errorName: Yup.string().min(2).max(100).required(),
        errorDescription: Yup.string().min(2).max(200).required(),
        errorSteps: Yup.string().min(2).max(200).required(),
        priority: Yup.string().required("Please select a priority level"),
        username: Yup.string().min(2).max(200).required(),
        developerAssigned: Yup.string().required("Please select a developer")
    });


    //reporting the error
    const onSubmit = (data)=>{
        Axios.post("http://localhost:3002/assigned/", data).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }else{
                alert(response.data);
                navigate("/assigned")
            }
        })
    }

    //displayed part in the browser
  return (
    <div className='assignErrorContainer'>
        <div className='assignForm'>
            <h1>Assign Error</h1>
            {errorFields.map((value, key)=>{
                return(
                
                <Formik initialValues={
                    {errorName: value.errorName,
                    errorDescription: value.errorDescription,
                    errorSteps: value.errorSteps,
                    priority: "",
                    username: value.createdBy,
                    developerAssigned: ""}}  validationSchema={validationSchema} onSubmit={onSubmit}>
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
                    <Field name='priority' className="inputReport" as="select" key={key}>
                            <option disabled value="">---Select priority---</option>
                            <option value = "cLow">Low</option>
                            <option selected value = "bMedium">Medium</option>
                            <option value = "aHigh">High</option>
                    </Field>
                    <label>Creator:</label>
                    <ErrorMessage name='username' component="span" className='error'/>
                    <Field name='username' className="inputReport" type="email" key={key} placeholder="Creator"  value={value.createdBy}/>
                    <label>Assign Developer:</label>
                    <ErrorMessage name='developerAssigned' component="span" className='error'/>
                    <Field name='developerAssigned' className="inputReport" as="select" key={key}>
                    <option disabled value="">---Select developer---</option>
                    {allDeveloper.map((value1, key1)=>{
                        return(
                            <option value = {value1.username} key={key1}>{value1.firstname+" "+value1.lastname}</option>
                        )
                     })}
                    </Field>
                    <button type="submit">Assign Error</button>
                </Form>
            </Formik>
             ) 
            })} 
        </div>
    </div>
  )
}

export default AssignError