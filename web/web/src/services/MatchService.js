import { api } from "./instance";

export const GetAllMatchBy = async (data) =>{
    try{
        const response = await api.get('/match', {params:data});
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
