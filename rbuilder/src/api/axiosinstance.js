import axios from "axios"

const axiosInstance=axios.create({
    baseURL:"http://localhost:3000",
    timeout:5000
})

// response interceptors:handling global/common error
  axiosInstance.interceptors.response.use(
    (response)=>{return response},
    (error)=>{
        if(error.response){
            const status=error.response.status
            if(status==401){
                console.log("un-autherized access...please login");
                
            }
            else if(status==404){
                 console.log("api not found");

            }
            else if(status==500){
                console.log("server error !!!");
                
            }
            else if(error.request){
                console.log("no response for server");
                
            }
            else{
            console.log("Error:"+error.massage);
            
            }
            return Promise.reject(err)
        }
    }
)

export default axiosInstance