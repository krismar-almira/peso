import { Box, Paper, Typography, Card, CardHeader, CardContent, CardMedia, TextField, Button } from "@mui/material";
import React,{useState, useEffect} from "react";
import './loading.css'
import { useAuthProvider } from "../context/authContext";
import { LoginUser } from "../services/AuthService";
import { useSnackbar } from "notistack";
import { GetCurrentUser } from "../services/UserService";


const Preloader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmmitLoading, setIsSubmmitLoading] = useState(false);
    const {user, isAuth, setIsAuth,setUser} = useAuthProvider();
    const [data, setData] = useState({email:'', password:''});
    const {enqueueSnackbar} = useSnackbar();
    
    useState(()=>{
        init();
    },[])
    function init (){
        const token = localStorage.getItem('AccessToken')
        if(token)getUserByToken();
    }
   
    async function getUserByToken(){
        setIsLoading(true);
        const res = await GetCurrentUser();
        setIsLoading(false);        
        if(!res.success){
            return;
        }
        setIsAuth(true);
        setUser(res.data);
        console.log(res)
    }
    const handleLogin = async() =>{
        console.log(data);
        setIsSubmmitLoading(true);
        const res = await LoginUser(data);
        setIsSubmmitLoading(false);
        if(!res.success){
            if(res.error.status==401){
                enqueueSnackbar('Invalid username or password', {variant:'error'});
            }
            return;
        }
        localStorage.setItem('AccessToken',res.data);
        init();
        enqueueSnackbar('Login Success', {variant:'success'});
    }
    return (
        <>
            {
                isLoading?
                <Box sx={{bgcolor:'black', width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:2}}>
                    <span className="loader"></span>
                    <Typography variant="body1" color="white">Loading</Typography>
                </Box>:
                <Box  sx={{display:"flex", justifyContent:'center', alignItems:'center', width:'100vw', height:'100vh'}}>
                    <Card sx={{width:300}} variant="outlined" elevation={1}>
                        
                        <CardContent>
                            <Typography sx={{mb:2, textAlign:'center', fontWeight:600}} variant="h6" color="initial">Login</Typography>
                            <Box sx={{display:'flex', flexDirection:"column", gap:.5}}>
                                <TextField type="email" value={data.email} onChange={(val)=>setData(prev=>({...prev, email:val.target.value}))} fullWidth variant="standard" label='Email'/>
                                <TextField type="password" value={data.password} onChange={(val)=>setData(prev=>({...prev, password:val.target.value}))} fullWidth variant="standard" label='Password'/>
                                <Button onClick={handleLogin} loading={isSubmmitLoading} variant="contained" size="small" sx={{mt:4}}>
                                    Login
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            }
            
        </>
        
    )
}
export default Preloader;