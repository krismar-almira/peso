import { Close, CloudUpload, Save, SaveAltOutlined, VerticalAlignBottom } from '@mui/icons-material';
import { Autocomplete, Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, FormControl, IconButton, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';
import React, {cloneElement, useEffect, useState} from 'react';
import noimage from '../../assets/noimage.jpg'
import { useSnackbar } from 'notistack';
import { GetAllTypeOfUsers, SaveUser } from '../../services/UserService';
import { GetAllCompany } from '../../services/CompanyService';
import { isEmptyString } from '../../helpers/helper';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

const UserDialog = ({setDialog}) =>{
    const [image, setImage] = useState(noimage);
    const [preview, setPreview] = useState(null);
    const [currentData, setCurrentData] = useState({first_name:'', last_name:'',middle_name:'',email:'', password:'',confirmpassword:'',type_of_user_id:1, company:null,image:null});
    const [typeOfUsers, setTypeOfUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(()=>{
        loadAllTypesOfUser();
        loadCompanyList();
    },[])
    const loadAllTypesOfUser = async () =>{
        const _types = await GetAllTypeOfUsers();
        if(_types.success){
            setTypeOfUsers(_types.data);
        }
    }
    const loadCompanyList = async () =>{
        const _res = await GetAllCompany();
        if(_res.success){
            setCompanies(_res.data);
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setCurrentData(prev=>({...prev, image:base64String}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        setImage(null);
        setPreview(null);
    };
    const clear = () =>{
        setCurrentData({first_name:'', last_name:'',middle_name:'',email:'', password:'',confirmpassword:'',type_of_user_id:1, company:null,image:null});
        setPreview(null);
    }
    const handleSave = async () =>{
        const exceptValidation = ['company', 'type_of_user_id','image'];
        for (const [key, value] of Object.entries(currentData)) {
            console.log(key);
            if(exceptValidation.includes(key));
            else if(isEmptyString(value)){
                enqueueSnackbar(`${key.replace('_',' ').toLocaleUpperCase()} is empty`, {variant:'error'})
                return;
            }
        }
        console.log(currentData);
        const data = {...currentData};
        data.company = currentData?.company?.id;
        if(!preview){
            enqueueSnackbar('Please add user profile.', {variant:'error'})
            return;
        }
        const res = await SaveUser(data);
        if(!res.success){
            if(typeof res.error.data != 'object'){
                enqueueSnackbar('There was an error while saving. Please review and correct your input data.', {variant:'error'})
                return;
            }
            for(const [key, value] of Object.entries(res.error.data)){
                enqueueSnackbar(value[0],{variant:'error'});
            }
            console.log(res.error);
            return;
        }
        enqueueSnackbar('Save success',{variant:'success'});
        clear();
        setDialog(false);
    }
    return(
        <Dialog open={true}>
            <DialogContent>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:1}}>
                    {preview&&
                    (<Card sx={{ width: 100 }}>
                        <CardMedia
                            component="img"
                            height="100"
                            image={preview}
                            alt="Preview"
                        />
                    </Card>)
                    }

                    {preview && (
                        <Button size="small" variant="outlined" color="error" onClick={handleRemove}>
                            Remove
                        </Button>
                    )}
                    <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    size='small'
                    startIcon={<CloudUpload />}
                    >
                        Select Profile
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                    
                </Box>
                <Box sx={{gap:0.9, display:'flex', flexDirection:'column', mt:2}}>
                    <Box sx={{display:'flex', gap:0.5, flexWrap:'wrap'}}>
                        <TextField sx={{minWidth:200, flex:1}} variant='filled' label='First Name' size='small' value={currentData.first_name} onChange={(val)=>setCurrentData(prev=>({...prev, first_name:val.target.value}))}/>
                        <TextField sx={{minWidth:200, flex:1}} variant='filled' label='Middle Name' size='small' value={currentData.middle_name} onChange={(val)=>setCurrentData(prev=>({...prev, middle_name:val.target.value}))}/>
                        <TextField sx={{minWidth:200, flex:1}} variant='filled' label='Last Name' size='small' value={currentData.last_name} onChange={(val)=>setCurrentData(prev=>({...prev, last_name:val.target.value}))}/>
                    </Box>
                    <TextField fullWidth variant='filled' label='Email' size='small' value={currentData.email} onChange={(val)=>setCurrentData(prev=>({...prev, email:val.target.value}))}/>
                    <Box sx={{display:'flex', gap:0.5}}>
                        <TextField fullWidth type='password' variant='filled' label='Password' size='small' value={currentData.password} onChange={(val)=>setCurrentData(prev=>({...prev, password:val.target.value}))}/>
                        <TextField fullWidth type='password' variant='filled' label='Confirm Password' error={currentData.confirmpassword!=currentData.password} helperText={currentData.confirmpassword!=currentData.password?'Password is not equal':''} size='small' value={currentData.confirmpassword} onChange={(val)=>setCurrentData(prev=>({...prev, confirmpassword:val.target.value}))}/>
                    </Box>
                    <FormControl size='small' variant='filled'>
                        <InputLabel>
                        Type of user
                        </InputLabel>
                        <Select size='small' label='type of user' fullWidth value={currentData.type_of_user_id} onChange={(val)=>setCurrentData(prev=>({...prev, type_of_user_id:val.target.value}))}>
                            {typeOfUsers.map(x=>(<MenuItem value={x.id}>{x.name}</MenuItem>))}
                        </Select>
                    </FormControl>
                    {currentData.type_of_user_id!=1&&(
                            <Autocomplete
                                disablePortal
                                value={currentData.company}
                                onChange={(_,val)=>setCurrentData(prev=>({...prev, company:val}))}
                                options={companies}
                                
                                variant='filled'
                                size='small'
                                renderInput={(params) => <TextField variant='filled' {...params} label="Select Company" />}
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option) => {
                                    const { id, ...optionProps } = props;
                                    return (
                                    <Box
                                        key={id}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                        loading="lazy"
                                        width="20"
                                        //srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        src={option.imagelocation}
                                        alt=""
                                        />
                                        {option.label}
                                    </Box>
                                    );
                                }}
                            />
                        
                    )}

                </Box>
                
            </DialogContent>
            <DialogActions >
                <Button color='error' startIcon={<Close/>} variant='contained' size='small' onClick={()=>{setDialog(false)}}>
                        close
                </Button>
                <Button startIcon={<Save/>} variant='contained' size='small' onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default UserDialog;