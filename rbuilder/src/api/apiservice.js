
import axiosInstance from "./axiosinstance"



const apiservice= async(httpmethod,url,reqbody)=>{
  
    const reqconfig={
     method:httpmethod,
     url,
     data:reqbody
    }
  
  
  
try{
const result=await axiosInstance(reqconfig)
return result
}
catch(err){
return err
}



   
}

export default apiservice