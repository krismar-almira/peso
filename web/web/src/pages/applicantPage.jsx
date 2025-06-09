import React,{useEffect, useState} from 'react';
import {Avatar, Box, Button, IconButton, Stack} from "@mui/material";
import { AddCircle } from '@mui/icons-material';
import CompanyDialog from '../components/dialog/companyDialog';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllCompany } from '../services/CompanyService';
import { useNavigate } from 'react-router-dom';
import ApplicantDialog from '../components/dialog/applicantDialog';

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
const ApplicantPage = () =>{
    const [dialog, setDialog] = useState(false);
    const [companies, setCompanies] =useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const navigate  = useNavigate();
    
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
    const handleRowClick = (val) =>{
        const data = val.row;
        navigate('/posting?company='+data.id);
    }
    return(
        <Box sx={{position:'relative'}}>
            <Button startIcon={<AddCircle/>} sx={{position:'absolute', right:0, top:-50, zIndex:1000}} aria-label="" onClick={()=>handleOpenDialog('New')}>
                Register new applicant
            </Button>
            {dialog&&<ApplicantDialog setDialog={setDialog}/>}
            {/* {dialog&&<CompanyDialog setDialog={setDialog}/>}
            <Box sx={{ flex: 1, position: 'relative', height:'calc(100vh - 250px)' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                    <DataGrid
                        onRowClick={handleRowClick}
                        loading={tableLoading}
                        columns={columns}
                        rows={companies}
                    />
                </Box>
            </Box> */}
            
        </Box>
    );
}
export default ApplicantPage;