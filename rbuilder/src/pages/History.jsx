import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { dlthistoryAPI, getHistoryAPI, getResumeAPI } from '../api/allApi';




function Histroy() {
  const[download,setDownloads]=useState([])
  useEffect(()=>{
      displayresume()
     },[])

    const displayresume=async()=>{
      const res=await getHistoryAPI()
      console.log(res);
      setDownloads(res.data)
      
    }
    const dltresume=async(id)=>{
      const  res=await dlthistoryAPI(id)
      console.log(res);
      displayresume()

    }


  return (


<div className='m-3'>
  <div className='d-flex align-item-center justify-content-center'>
  <div></div>
  <h1 className='text-center text-danger'>download resumes</h1>
  <Link to={'/resume/:id/view'}>back</Link>
  </div>
 <div className='row m-3'>
          {
            download?.length>0?
            download?.map(dwld=>(
               <div className='col-lg-4'>
<paper sx={{padding:'10px'} }>
<div className='d-flex justify-content-between align-items-center'>
<div><h4>{dwld?.timesamp}</h4></div>
<button className='btn text-danger' onClick={()=>dltresume(dwld?.id)}><i className="fa-solid fa-trash fa-xl"></i></button>
              </div>
              <div>
                <img src={dwld?.resumeimg} alt="" className='img-fluid'/>
</div>
</paper>
         </div> 
            ))
            :
            <p className='text-center text-danger' >no resume download yet</p>        
          }
          <div className='col-lg-8'>

          </div>
          </div>
          </div>
  )}

  
  

export default Histroy