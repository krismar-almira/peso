import { api } from "./instance";

export const GetDashboardData = async () =>{
    try{
        const response = await api.get('/dashboard');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
