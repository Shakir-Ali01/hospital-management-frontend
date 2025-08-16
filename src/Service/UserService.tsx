import axiosInnstance from "../Interceptor/AxiosInterceptor.tsx"

const registerUser = async (user: any)=>{
    return axiosInnstance.post('/user/register', user)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
const loginUser = async (user: any)=>{
    return axiosInnstance.post('/user/login', user)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
export  {registerUser,loginUser};