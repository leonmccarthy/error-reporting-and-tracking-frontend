import Axios from 'axios';
import "../../styles/assignedErrors.css"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AssignedErrors() {
    let navigate = useNavigate();
    const [ listAssignedErrors, setAssignedErrors] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3002/assigned/display").then((response)=>{
            setAssignedErrors(response.data)
        })
    })
  return (
    <div className='assignedErrorContainer'>
        <h1>Assigned Errors</h1>
        {listAssignedErrors.map((value, key)=>{
            return(
                <div className='errorHolder'>
                    <div className='errorName' key={key}>Error title: {value.errorName}</div>
                    <div className='errorDescription' key={key}>Error desription: {value.errorDescription}</div>
                    <div className='errorSteps' key={key}>Steps to recreate error: {value.errorSteps}</div>
                    <div className='priority' key={key}>Priority: {value.priority}</div>
                    <div className='developerassigned' key={key}>Developer Assigned: {value.developerassigned}</div>
                    <div className='stepsToComplete' key={key} onClick={()=>{navigate(`/totalsteps/${value.id}`)}}>Steps required to solve the error: {value.stepsToComplete}</div>
                    <div className='stepsDone' key={key}  onClick={()=>{navigate(`/completedsteps/${value.id}`)}}>Steps done: {value.stepsDone}</div>
                    <div className='createdBy' key={key}>Created by: {value.createdBy}</div>
                    <div className='createdAt' key={key}>Created at: {value.createdAt}</div>
                    <div className='percentage'>Percentage complete: {(value.stepsDone/value.stepsToComplete)*100}%</div>
                </div>
            )
        })}
    </div>
  )
}

export default AssignedErrors