import { api } from "./instance";

export const SaveNewJobFairSchedule = async (data) =>{
    try{
        const response = await api.post('/jobfair', data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const GetAllJobFairSchedule = async (data) =>{
    try{
        const response = await api.get('/jobfair');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const JoinJobFair = async (data) =>{
    try{
        const response = await api.post('/jobfair/join', data);
        return { success: true, data: response.data};
        
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const JobFairParticipants = async (data) =>{
    try{
        const response = await api.get('/jobfair/participants', {params:data});
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const AcceptJobFair = async (data) =>{
    try{
        const response = await api.post('/jobfair/accept', data);
        return { success: true, data: response.data};
        
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}

export const JobFairJoinEmployers= async ()=>{
    try{
        const response = await api.post('/jobfair/accept', data);
        return { success: true, data: response.data};
        
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}