import { api } from "./instance"

export const AddNewPosition = async (data) =>{
    try{
        const response = await api.post('/position',data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const GetAllPositions = async () =>{
    try{
        const response = await api.get('/position');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}

