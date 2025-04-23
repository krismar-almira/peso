import React,{useEffect, useState} from 'react';
import {Avatar, Box, IconButton, Stack} from "@mui/material";
import { AddCircle } from '@mui/icons-material';
import CompanyDialog from '../components/dialog/companyDialog';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllCompany } from '../services/CompanyService';

const columns = [
    {headerName:'',field:'_',
        renderCell:(row)=>{
            console.log(row.row)
            
            return(<Box sx={{display:'flex', alignItems:'center', alignContent:'center', height:'100%'}}>
                <Avatar src={row.row.imagelocation}/>
            </Box> )
        }
    },
    {headerName:'Company Name',field:'name',flex:1},
    {headerName:'Description',field:'description',flex:2},

]
const CompanyPage = () =>{
    const [dialog, setDialog] = useState(false);
    const [companies, setCompanies] =useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    
    useEffect(()=>{
        if(!dialog)
        loadComapanies();
    },[dialog])
    
    const loadComapanies = async () =>{
        setTableLoading(true);
        const _res = await GetAllCompany();
        setTableLoading(false);
        if(_res.success){
            setCompanies(_res.data);
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
            {dialog&&<CompanyDialog setDialog={setDialog}/>}
            <Box sx={{ flex: 1, position: 'relative', height:'calc(100vh - 250px)' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                    <DataGrid
                        loading={tableLoading}
                        columns={columns}
                        rows={companies}
                    />
                </Box>
            </Box>
            
        </Box>
    );
}
export default CompanyPage;