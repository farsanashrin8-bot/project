
import { Box, Divider, Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Preview({resumeData}) {
  console.log(resumeData);
  
  return (
    <Box className='me-3'>
      <Paper elevation={3} sx={{textAlign:'center', padding:'10px'}}>
        <h2 style={{color:'black'}}>{resumeData?.name}</h2>
        <h3>{resumeData?.jobTitle}</h3>
        <p>
          <span>{resumeData?.location}</span>||<span>{resumeData?.email}</span>||<span>{resumeData?.phone}</span>
          </p>
          <p><Link>{resumeData?.github}</Link>|<Link> {resumeData?.linkedin}</Link></p>
          <h4 className='text-center'>SUMMARY</h4>
          <Divider sx={{borderColor:'black'}}></Divider>
          <p>{resumeData?.summary}</p>
          <h4 className='text-center'>Skills</h4>
          <Divider sx={{borderColor:'black'}}></Divider>
{
  resumeData?.skills?.map(sk=>(
    <button className='btn border m-2'>{sk}</button>
  ))
}


          <button className='btn'>react</button>
          <h4 className='text-center'>Education</h4>
          <Divider sx={{borderColor:'black'}}></Divider>
           <h4 className='text-center'>{resumeData?.degree}</h4>
            <p>{resumeData?.university}|| {resumeData?.passout}</p>
        </Paper>

    </Box>
  )
}

export default Preview