import React, { useEffect, useState } from 'react';
import Axios from "axios";
import "../../styles/Dashboard.css"
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [ listOfErrors, setlistOfErrrors ] = useState([]);
  let navigate = useNavigate()

  useEffect(()=>{
    Axios.get("http://localhost:3002/error/").then((response)=>{
      setlistOfErrrors(response.data);
      console.log(response.data)
    })
  }, [])

  return (
    <div className='dashboardPageContainer'>
      <div className='dashboardContainer'>
          <h1>Error reported</h1>
          {listOfErrors.map((value, key)=>{
            return(
            <div className='errorContainer' onClick={()=>{navigate(`/assign/${value.id}`)}}>
              <div className='title' key={key}>{value.errorName}</div>
              <div className='description' key={key}>Description: {value.errorDescription}</div>
              <div className='steps' key={key}>Steps to recreate error: {value.errorSteps}</div>
              <div className='creator' key={key}>Creator: @{value.createdBy}</div>
              <div className='createdAt' key={key}>Created At: {value.createdAt}</div>
            </div>
            )
          })}
      </div>
    </div>
  )
}

export default Dashboard