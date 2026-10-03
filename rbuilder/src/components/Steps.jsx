import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jobTypes from '../assets/jobRole.json'
import jobskills from '../assets/jobSkills.json'
import summary from '../assets/summaries.json'
import { addResumeAPI } from '../api/allApi';
import { useNavigate } from 'react-router-dom';



const steps = ['Basic Information', 'Contact details', 'Educational details','Review & submit'];

function Steps({resumeData,setResumeData}) {
     const [activeStep, setActiveStep] = React.useState(0);
     const navigate=useNavigate()

  
     
 

// console.log(resumeData);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

 

  const handleReset = () => {
    setActiveStep(0);
  };

  
//   render the content corresponding to array index
 const viewstepcontent=(stepcount)=>{
  switch(stepcount){
    case 0 :return(
        <div>
            <h3>personal details</h3>
            <div>
                <TextField value={resumeData.name} onChange={(e)=>setResumeData({...resumeData,name:e.target.value})} id="standard-fnam" label="full name" variant="standard" className='w-100' />
            </div>
            <div>
                <FormControl variant="standard" className='w-100'>
        <InputLabel id="demo-simple-select-standard-label"> choose job title</InputLabel>
        <Select onChange={(e)=>setResumeData({...resumeData,jobTitle:e.target.value})} labelId="demo-simple-select-standard-label" id="demo-simple-select-standard">
        { 
        jobTypes.jobRoles.map(job=>(
            <MenuItem  key={job} value={job}>{job}</MenuItem>
        ))
         
         }
           </Select>
      </FormControl>
            </div>
            <div>
                <TextField value={resumeData.location} onChange={(e)=>setResumeData({...resumeData,location:e.target.value})} id="standard-loc" label="Location" variant="standard" className='w-100' />
            </div>
        </div>
    ) 
    case 1 :return(
        <div>
            <h3>contact details</h3>
            <div>
                <TextField value={resumeData.email} onChange={(e)=>setResumeData({...resumeData,email:e.target.value})} id="standard-email" label="Email" variant="standard" className='w-100' />
            </div>
            <div>
                <TextField value={resumeData.phone} onChange={(e)=>setResumeData({...resumeData,phone:e.target.value})} id="standard-phone" label="Phone" variant="standard" className='w-100' />
               
            </div>
            <div>
                <TextField value={resumeData.github} onChange={(e)=>setResumeData({...resumeData,github:e.target.value})} id="standard-git" label="gitHub link" variant="standard" className='w-100' />
            </div>
            <div>
                <TextField  value={resumeData.linkedin} onChange={(e)=>setResumeData({...resumeData,linkedin:e.target.value})} id="standard-link" label="LinkedIn link" variant="standard" className='w-100' />
            </div>

        </div>
    ) 
       case 2 :return(
        <div>
            <h3>Educational details</h3>
            <div>
                <TextField value={resumeData.degree} onChange={(e)=>setResumeData({...resumeData,degree:e.target.value})} id="standard-degree" label="Bachlelor's degree" variant="standard" className='w-100' />
            </div>
            <div>
                <TextField value={resumeData.university} onChange={(e)=>setResumeData({...resumeData,university:e.target.value})} id="standard-clg" label="College" variant="standard" className='w-100' />
               
            </div>
            <div>
                <TextField  value={resumeData.passout}onChange={(e)=>setResumeData({...resumeData,passout:e.target.value})} id="standard-psout" label="passout year" variant="standard" className='w-100' />
            </div>
          

        </div>
    ) 
     case 3 :return(
        <div>
            <h3>skills</h3>
            <p>
                Our ai will genarate skills and summary according to your job role
                click the <b>AI SKILL AND SUMMARY </b>button to proceed
            </p>
          

        </div>
    ) 
    
    
  }
 
 }

 const genarateAI=()=>{
  setResumeData({...resumeData,skills:jobskills[resumeData.jobTitle],
    summary:summary[resumeData.jobTitle]})

   handleNext()
 }
 const addResume= async ()=>{
  const {name,jobTitle,location,email,phone,github,linkedin,degree,university,passout,skills,summary}=resumeData
if(name&&jobTitle&&location&&email&&phone&&github&&linkedin&&degree&&university&&passout&&skills&&summary){
  // api call
  const res = await  addResumeAPI(resumeData)
  console.log(res);
   if (res.status==201) {
      alert("Resume added  successfully ")
      navigate(`/resume/${res.data.id}/view`)
    }
  }
else{
  alert("enter the fields completely")
}

}

 
  return (
   <Box sx={{ width: '100%' }} className='ms-3 me-2'>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={addResume}>
              FINISH
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {/* view of step1 */}
           <Box>
            {viewstepcontent(activeStep)}
           </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
           
           
              {
              activeStep === steps.length - 1 ? 
              <Button onClick={genarateAI}>genarate AI skills & summary</Button>
              :
             <Button onClick={handleNext}>next</Button>
              }
            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
  

export default Steps