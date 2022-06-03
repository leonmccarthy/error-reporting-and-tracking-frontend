import React from 'react';
import Axios from "axios";
import * as Yup from "yup"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom"

function TotalSteps() {
    let navigate = useNavigate();

    const initialValues = {
        errorDescription: "",
        stepsToComplete: 0
    };

    const validationSchema = Yup.object().shape({
        errorDescription: Yup.string().min(4).max(200).required(),
        stepsToComplete: Yup.number().required()
    });

    const onSubmit = (data) =>{
        Axios.put("http://localhost:3002/assigned/steps", data).then((response)=>{
            if(response.data.error){
                alert(response.data.errror);
            }else{
                alert(response.data);
                navigate("/assigned")
            }
        })
    }
  return (
    <div className='totalStepsContainer'>
        <div className='form'>
            <h1>Update steps completed</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <label>Error description: </label>
                    <ErrorMessage name='errorDescription' component="span" className='error'/>
                    <Field name='errorDescription' type="text" className="inputAssign" placeholder="Error description"/>
                    <label>Steps required for completion: </label>
                    <ErrorMessage name='stepsToComplete' component="span" className='error'/>
                    <Field name='stepsToComplete' type="text" className="inputAssign" placeholder="Enter number of steps"/>
                    <button type="submit">Submit number of steps</button>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default TotalSteps