import axiosInnstance from "../Interceptor/AxiosInterceptor.tsx"

const getPatient = async (id: any)=>{
    return axiosInnstance.get('/profile/patient/get/'+id)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
const updatePatient = async (patient:any)=>{
    return axiosInnstance.put('/profile/patient/update',patient)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
export  {getPatient,updatePatient};