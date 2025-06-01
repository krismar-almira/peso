import { api } from "./instance"

export const AddVacantPosition = async (data) =>{
    try{
        const response = await api.post('/vacantposition',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const GetAllVacantPosition = async (data) =>{
    try{
        const response = await api.get('/vacantposition',{params:data});
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
