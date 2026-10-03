import apiservice from "./apiservice";

// add resume api called by step component

export const addResumeAPI= async(reqbody)=>{

    
  return  await apiservice("POST",`/allResume`,reqbody)
}

// get single resume api called bt view components

export const getResumeAPI= async(resumeId)=>{

  return  await apiservice("GET",`/allResume/${resumeId}`,{})
}


export const editResumeAPI= async(resumeId,reqbody)=>{

  return  await apiservice("put",`/allResume/${resumeId}`,reqbody)
}

export const addhistoryAPI= async(reqbody)=>{

  return  await apiservice("POST",`/history`,reqbody)
}

export const getHistoryAPI= async()=>{

  return  await apiservice("GET",`/history`,{})
}

export const dlthistoryAPI= async(resumeId)=>{

  return  await apiservice("DELETE",`/history/${resumeId}`,{})
}




