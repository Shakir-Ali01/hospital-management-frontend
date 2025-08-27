import axiosInnstance from "../Interceptor/AxiosInterceptor.tsx"

const getDoctors = async (id: any)=>{
    return axiosInnstance.get('/profile/doctors/get/'+id)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
const updateDoctors = async (doctor:any)=>{
    return axiosInnstance.put('/profile/doctors/update',doctor)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
export  {getDoctors,updateDoctors};