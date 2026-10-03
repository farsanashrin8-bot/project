import React, { useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jobTypes from '../assets/jobRole.json'
import { editResumeAPI } from '../api/allApi';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight:'80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY:'auto',
};
function Edit({resumeData,setResumeData}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   const skillref=useRef()
   const addskill=(skill)=>{
    console.log(skill);
if(skill){
if(resumeData.skills?.map(sk=>sk.toLowerCase()).includes(skill.toLowerCase())){
   alert("skill already added")
}else{
   setResumeData({...resumeData,skills:[...resumeData?.skills,skill]})
}
skillref.current.value=""
}else{
   alert("enter a valid skill")
}

   }
   const removeSkill=(skill)=>{
    setResumeData({...resumeData,skills:resumeData.skills.filter(sk=>sk!=skill)})
   }
    const editResume= async ()=>{
     const {name,jobTitle,location,email,phone,github,linkedIn,degree,university,passout,skills,summary}=resumeData
   if(name&&jobTitle&&location&&email&&phone&&github&&linkedIn&&degree&&university&&passout&&skills&&summary){
     // api call
    const res=await editResumeAPI(resumeData?.id,resumeData)
console.log(res);

if(res.status==200){
    handleClose()
}


   }
   else{
     alert("enter the fields completely")
   }
   
   }
// {current}
  return (
   <>
   <button className='btn text-warning' onClick={handleOpen}><i className="fa-solid fa-file-pen fa-2xl"></i></button>
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           {/* content */}
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
                             <TextField  value={resumeData.linkedIn} onChange={(e)=>setResumeData({...resumeData,linkedIn:e.target.value})} id="standard-link" label="LinkedIn link" variant="standard" className='w-100' />
                         </div>
             
                     </div>
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
             <div className='mt-3'>
            <h3>Skills</h3>
             <div className='d-flex align-items-center'>
                <input ref={skillref}  placeholder='enter skill' className='form-control' />
                <button className='btn btn-primary ms-2' onClick={()=>addskill(skillref.current.value)}>ADD</button>
             </div>
            <p className='fw-bold mt-3'>Add Skills:</p>
           {
            resumeData?.skills?.map(skill=>(
               <span className='btn btn-dark m-2'>{skill}<button className='btn text-light' onClick={()=>removeSkill(skill)}>x</button></span>
            ))
}
</div>
        <div className="mt-3">
            <h3>Professional Summary</h3>
            <div>
                 <TextField value={resumeData.summary} multiline id="standard-summary" label="Summary" variant="standard" className='w-100'/>
             </div>
        </div>
        <button onClick={editResume} className='btn btn-primary w-100 mt-5' >UPDATE</button>
          </Typography>
        </Box>
      </Modal>
   </>
  )
}

export default Edit