import { api } from "./instance";

export const SaveNewCompany = async (data) =>{
    try{
        const response = await api.post('/company', data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const GetAllCompany = async (data) =>{
    try{
        const response = await api.get('/company', data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const GetCompanyById = async (data) =>{
    try{
        const response = await api.post('/company/getbyid', data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}

export const GetAllEmployeersRequest = async () =>{
    try{
        const response = await api.get('/company/employersreq');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const EmployeerRequestApprove = async (data) =>{
    try{
        const response = await api.put('/company/employersreq/approve',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const EmployeerRequestDelete = async (data) =>{
    try{
        const response = await api.put('/company/employersreq/delete',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const AddEmployeerToJobFairSchedule = async (data) =>{
    try{
        const response = await api.post('/company/addcompanyschedule',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const GetEmployeerToJobFairSchedule = async (data) =>{
    try{
        const response = await api.get('/company/geemployerjoinjobfairschedule',{params:data});
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const DeleteEmployerJobFairSchedule = async (data) =>{
    try{
        const response = await api.delete('/company/employerjoinjobfairschedule',{params:data});
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}

export const GetAllNsrp2Request = async (data) =>{
    try{
        const response = await api.get('/company/nsrp2req');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const NSRP2RequestApprove = async (data) =>{
    try{
        const response = await api.put('/company/nsrp2req/approve',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const NSRP2RequestDelete = async (data) =>{
    try{
        const response = await api.put('/company/nsrp2req/delete',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}