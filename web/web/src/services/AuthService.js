import { api } from "./instance"

export const LoginUser = async (data) =>{
    try{
        const response = await api.post('/login', data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}

