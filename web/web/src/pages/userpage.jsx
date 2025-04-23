import React,{useEffect, useState} from 'react';
import {Avatar, Box, IconButton, Stack} from "@mui/material";
import { AddCircle } from '@mui/icons-material';
import CompanyDialog from '../components/dialog/companyDialog';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllCompany } from '../services/CompanyService';
import UserDialog from '../components/dialog/userDialog';
import { GetAllUser } from '../services/UserService';
import { getValueOptions } from '@mui/x-data-grid/internals';

const columns = [
    {headerName:'',field:'_',
        renderCell:(row)=>{
            console.log(row.row)
            
            return(<Box sx={{display:'flex', alignItems:'center', alignContent:'center', height:'100%'}}>
                <Avatar src={row.row.imagelocation}/>
            </Box> )
        }
    },
    {headerName:'Name',field:'name',flex:1,
        valueGetter:(_,val)=>{
            return `${val.first_name} ${val.last_name}`;
        }
    },
    {headerName:'Company',field:'company',flex:1,
        valueGetter:(_,val)=>{
            return val?.company?.name?val.company.name:'no company';
        }
    },

]
const UserPage = () =>{
    const [dialog, setDialog] = useState(false);
    const [users, setUsers] =useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    
    useEffect(()=>{
        if(!dialog)
            loadUser();
    },[dialog])
    
    const loadUser = async () =>{
        setTableLoading(true);
        const _res = await GetAllUser();
        setTableLoading(false);
        if(_res.success){
            setUsers(_res.data);
        }
    }
    const handleOpenDialog = (crud) =>{
        setDialog(true);
    }
    return(
        <Box sx={{position:'relative'}}>
            <IconButton sx={{position:'absolute', right:0, top:-50, zIndex:1000}} aria-label="" onClick={()=>handleOpenDialog('New')}>
              <AddCircle/>
            </IconButton>
            {dialog&&<UserDialog setDialog={setDialog}/>}
            <Box sx={{ flex: 1, position: 'relative', height:'calc(100vh - 250px)' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                    <DataGrid
                        loading={tableLoading}
                        columns={columns}
                        rows={users}
                    />
                </Box>
            </Box>
            
        </Box>
    );
}
export default UserPage;