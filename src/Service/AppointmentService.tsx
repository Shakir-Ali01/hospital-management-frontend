import axiosInnstance from "../Interceptor/AxiosInterceptor.tsx"

const scheduleAppointment = async (data: any)=>{
    return axiosInnstance.post('/appointment/schedule',data)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}

const cancelAppointment = async (id: any)=>{
    return axiosInnstance.put('/appointment/cancel/'+id)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
const getAppointmentById = async (id: any)=>{
    return axiosInnstance.get('/appointment/getAppointment/'+id)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
const getAppointmentWithName = async (id: any)=>{
    return axiosInnstance.get('/appointment/get/details/'+id)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}

const getAppointmentByPatientId = async (patientId: any)=>{
    return axiosInnstance.get('/appointment/getAllAppointmentByPatient/'+patientId)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
const getAppointmentByDoctorId = async (doctorId: any)=>{
    return axiosInnstance.get('/appointment/getAllAppointmentByDoctorId/'+doctorId)
     .then((response:any) => response.data)
     .catch((error:any) => {throw error;})
}
export {getAppointmentByDoctorId,scheduleAppointment,cancelAppointment,getAppointmentById,getAppointmentWithName,getAppointmentByPatientId};