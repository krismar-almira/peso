import { api } from "./instance"

export const getAllEducationLevel = async () =>{
    try{
        const response = await api.get('/education/level');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const saveEducationalAttainement = async (data) =>{
    try{
        const response = await api.post('/education/attainment',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const getAllEducationalAttainement = async () =>{
    try{
        const response = await api.get('/education/attainment');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}

