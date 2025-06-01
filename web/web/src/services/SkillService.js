import { api } from "./instance"

export const AddNewSkill = async (data) =>{
    try{
        const response = await api.post('/skill',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const GetAllSkills = async (data) =>{
    try{
        const response = await api.get('/skill',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
