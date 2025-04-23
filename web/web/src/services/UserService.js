import { api } from "./instance"

export const GetCurrentUser = async () =>{
    try{
        const response = await api.get('/user/current');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const GetAllTypeOfUsers = async () =>{
    try{
        const response = await api.get('/user/type');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const SaveUser = async (data) => {
    try{
        const response = await api.post('/user', data);
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const GetAllUser = async (data) => {
    try{
        const response = await api.get('/user');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}
export const logOutUserServer = async () => {
    try{
        const response = await api.get('/user/logout');
        return { success: true, data: response.data};
    }
    catch(ex){
        return { success: false, error: {status:ex.response.status,data:ex.response.data}};
    }
}

