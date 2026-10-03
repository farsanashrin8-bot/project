import React, { useEffect, useRef, useState } from 'react'
import Preview from '../components/Preview'
import Edit from '../components/Edit'
import { Link, useParams } from 'react-router-dom'
import { addhistoryAPI, getResumeAPI } from '../api/allApi'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


function View() {
     let {id}=useParams()
     const [resumeData,setResumeData]=useState({})

     const Previewref=useRef()

     useEffect(()=>{
      getResumeDetails()
     },[])
    //  console.log(id);
    const getResumeDetails=async()=>{
      const res=await getResumeAPI(id)
      // console.log(res);
      setResumeData(res.data)
      
    }

    const downloadresume=async()=>{
const previewtag=Previewref.current
 const canvas=await html2canvas(previewtag)
 canvas.toBlob(async(blob)=>{


  const formdata=new FormData()
  formdata.append('file',blob)
  formdata.append("upload_preset","my_preset");


  const response = await fetch(
        "https://api.cloudinary.com/v1_1/qdk1bzgn/image/upload",
        {
          method: "POST",
          body: formdata,
        }
      );
    const res=await response.json()
    console.log(res);

    const shorturl=res.secure_url
    generatepdf(shorturl)
    
      


 })
 

    }

    const generatepdf=async(imgurl)=>{
   const today=new Date()   
console.log(today);



let timestamp=`${today.toLocaleDateString()},${today.toLocaleTimeString()}`
// console.log(timestamp);

const pdf=new jsPDF()
const imgWidth=pdf.internal.pageSize.getWidth()
const imgheight=pdf.internal.pageSize.getHeight()
pdf.addImage(imgurl,'PNG',0,0,imgWidth,imgheight)
pdf.save(`${resumeData?.name}-resume.pdf`)


const downloadDetails={
  timestamp,resumeId:resumeData?.id,resumeimg:imgurl,jobRole:resumeData?.jobTitle
}

const res=await addhistoryAPI(downloadDetails)
console.log(res);
if(res.status==201){
  pdf.save(`${resumeData?.name}-resume.pdf`)
}





    }
  return (
    <div className='d-flex align-items-center justify-content-center flex-column m-5 p-5'>
      <div>
        <button className='btn text-danger' onClick={downloadresume}><i className="fa-solid fa-file-arrow-down fa-2xl"></i></button>
        <Edit resumeData={resumeData} setResumeData={setResumeData}/>
        <Link to={'/history'} className='text-success'><i className="fa-solid fa-clock-rotate-left fa-2xl"></i></Link>
        <Link to={'/form'} className='text-primary ms-3'><i className="fa-solid fa-backward fa-2xl"></i></Link>
      </div>
      <div ref={Previewref} className='m-5'>
        <Preview resumeData={resumeData}/>
      </div>
    </div>
  )
}

export default View