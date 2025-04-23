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



