import React,{useEffect, useState} from 'react';
import {Avatar, Box, Button, Chip, Divider, IconButton, Stack} from "@mui/material";
import { AddCircle, Widgets } from '@mui/icons-material';
import CompanyDialog from '../components/dialog/companyDialog';
import { DataGrid } from '@mui/x-data-grid';
import { EmployeerRequestApprove, EmployeerRequestDelete, GetAllCompany, GetAllEmployeersRequest, GetAllNsrp2Request, NSRP2RequestApprove, NSRP2RequestDelete } from '../services/CompanyService';
import PositionDialog from '../components/dialog/positionDialog';
import { GetAllPositions } from '../services/PositionService';
import { localizeTime, romanize } from '../helpers/helper';
import SkillDialog from '../components/dialog/skillDialog';
import { GetAllSkills } from '../services/SkillService';
import { useSnackbar } from 'notistack';
import Nsrp1Dialog from '../components/dialog/nsrp1Dialog';
import Nsrp2Dialog from '../components/dialog/nsrp2Dialog';



const Nsrp2Page = () =>{
    const [dialog, setDialog] = useState(false);
    const [nsrp1s, setNsrp1s] =useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [nsrpDialog,setNsrp2Dialog] = useState(false);
    const [seletedNsrp, setSelectedNsrp] = useState();
    const columns = [
        {headerName:'Full Name',field:'full_name',width:200},
        {
            headerName:'Job Fair Schedule',
            field:'_',
            flex:1,
            valueGetter:(_, row)=>{
                return row?.j_s?.theme
            }
        },
        
        {
            headerName:'Date Requested',
            field:'__',
            width:200,
            valueGetter:(params,row)=>{
                return localizeTime(row.created_at);
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
                <Box height='100%'  display="flex" flex='row' alignItems="center" alignContent='center' gap={1}>
                    <Button
                        variant="contained"
                        color="default"
                        size="small"
                        onClick={()=>{
                            setSelectedNsrp(params.row);
                            setNsrp2Dialog(true);
                        }}
                        >
                            View
                    </Button>
                    <Divider orientation='vertical' flexItem />
                    {
                        params.row.confirmed?
                     
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            disabled
                            >
                                Approved
                        </Button>
                        :
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                    onClick={() => handleApprove(params.row)}
                                >
                                    approve
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                    onClick={() => handleDelete(params.row)}
                                >
                                    Delete
                            </Button>
                        </>
                        
                    }
                   
                </Box>
                
            ),
    },

    ]
    const handleApprove = async (row) =>{
        console.log(row);
        const res = await NSRP2RequestApprove({id:row.id});
        if(res.success){
            enqueueSnackbar('Approved',{variant:'success'});
            loadNsrp2();
        }
    }
    const handleDelete = async (row) =>{
        console.log(row);
        const res = await NSRP2RequestDelete({id:row.id});
        if(res.success){
            enqueueSnackbar('Approved',{variant:'success'});
            loadNsrp2();
        }
    }
    useEffect(()=>{
        if(!dialog)
        loadNsrp2();
    },[dialog])
    
    const loadNsrp2 = async () =>{
        setTableLoading(true);
        const _res = await GetAllNsrp2Request();
        setTableLoading(false);
        if(_res.success){
            setNsrp1s(_res.data);
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
            {nsrpDialog&&<Nsrp2Dialog data={seletedNsrp} setDialog={setNsrp2Dialog}/>}
            {dialog&&<SkillDialog setDialog={setDialog}/>}
            <Box sx={{ flex: 1, position: 'relative', height:'calc(100vh - 250px)' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                    <DataGrid
                        loading={tableLoading}
                        columns={columns}
                        rows={nsrp1s}
                    />
                </Box>
            </Box>
            
        </Box>
    );
}
export default Nsrp2Page;